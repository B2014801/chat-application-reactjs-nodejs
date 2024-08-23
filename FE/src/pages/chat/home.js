import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import ChatUser from "../../components/ChatUser";
import classNames from "classnames/bind";
import style from "./home.module.scss";
import Search from "../../components/Search";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { serverApi, serverUrl } from "../url/apiUrl";

const cx = classNames.bind(style);
function Home() {
  const navigate = useNavigate();
  const socket = useRef();
  const [users, setUsers] = useState([]);
  const [currentFriend, setCurrentFriend] = useState({
    _id: null,
    username: "",
    message: [],
  });
  const [currentUser] = useState(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER) === undefined
      ? undefined
      : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER))
  );
  const messageList = useRef(null);
  useEffect(() => {
    (async () => {
      if (!currentUser) {
        navigate("/login");
      } else {
        const { data } = await axios.get(
          serverApi.getAllUser + "/" + currentUser._id
        );
        const updatedData = await Promise.all(
          data.map(async (user) => {
            const { data: messages } = await axios.post(
              serverApi.getAllMessage,
              {
                from: currentUser._id,
                to: user._id,
              }
            );

            user.message = messages;
            return user;
          })
        );
        setUsers(updatedData);
        socket.current.emit("add-user", currentUser._id);
      }
    })();
  }, [navigate, currentUser]);

  useEffect(() => {
    socket.current = io(serverUrl);
    socket.current.on("message-recieve", (data) => {
      addMessage(data.from, data.message, false);
    });
  }, []);

  const addMessage = (id, message, self) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            message: [{ message: message, fromSelf: self }, ...user.message],
          };
        }
        return user;
      })
    );
  };

  const handleChangeCurrentFriend = (user) => {
    setCurrentFriend(user);
  };

  const handleChangeMessageInput = (isTyping) => {};

  const handleSendMessage = async (message) => {
    const data = {
      from: currentUser._id,
      to: currentFriend._id,
      message: message,
    };
    await axios.post(serverApi.sendMessage, data);
    socket.current.emit("send-message", data);
    addMessage(currentFriend._id, message, true);
  };

  const getCurrentMessage = useMemo(() => {
    return users.filter((user) => user._id === currentFriend._id)[0]?.message;
  }, [currentFriend._id, users]);

  return (
    <div className={cx("home-container")}>
      <div className={cx("home-left-side")}>
        <ChatUser username={currentUser?.username} hover={false}></ChatUser>
        <Search />
        {users.map((user) => (
          <ChatUser
            key={user._id}
            username={user.username}
            message={
              user.message?.[0]?.fromSelf
                ? "You: " + user.message?.[0]?.message
                : user.message?.[0]?.message
            }
            onClick={() => handleChangeCurrentFriend(user)}
          ></ChatUser>
        ))}
      </div>
      <div className={cx("home-right-side")}>
        {currentFriend._id !== null ? (
          <>
            <div className={cx("header")}>
              <ChatUser
                username={currentFriend.username}
                hover={false}
              ></ChatUser>
            </div>
            <div className={cx("body")}>
              <div className={cx("message-list")}>
                {currentFriend._id ? (
                  getCurrentMessage.map((mes, index) => (
                    <Message
                      message={mes.message}
                      key={index}
                      isShowAvata={
                        getCurrentMessage[index + 1] &&
                        getCurrentMessage[index].fromSelf !==
                          getCurrentMessage[index + 1].fromSelf
                      }
                      isCurrentUser={mes.fromSelf}
                    ></Message>
                  ))
                ) : (
                  <div className={cx("chat-welcome")}>
                    <h3>Send something to your friend</h3>
                  </div>
                )}
                <div ref={messageList}></div>
              </div>
              <MessageInput
                sendIsTyping={handleChangeMessageInput}
                onSubmit={handleSendMessage}
              ></MessageInput>
            </div>
          </>
        ) : (
          <div className={cx("chat-welcome")}>
            <h2>Welcome to the chat app, choose a friend to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
