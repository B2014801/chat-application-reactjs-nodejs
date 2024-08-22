import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ChatUser from "../../components/ChatUser";
import classNames from "classnames/bind";
import style from "./home.module.scss";
import Search from "../../components/Search";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { serverApi } from "../url/apiUrl";

const cx = classNames.bind(style);
function Home() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentFriend, setCurrentFriend] = useState({
    _id: null,
    message: [],
  });
  const [currentUser] = useState(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER) === undefined
      ? undefined
      : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_USER))
  );
  useEffect(() => {
    (async () => {
      if (currentUser === undefined) {
        navigate("/login");
      } else {
        const { data } = await axios.get(
          serverApi.getAllUser + "/" + currentUser._id
        );
        setUsers(data);
      }
    })();
  }, [navigate, currentUser]);

  const handleChangeCurrentFriend = (id) => {
    if (id !== currentFriend._id) {
      const getMessage = async () => {
        const { data } = await axios.post(serverApi.getAllMessage, {
          from: currentUser._id,
          to: id,
        });
        if (data.length > 0) {
          setCurrentFriend({ _id: id, message: data });
        }
        setCurrentFriend({ _id: id, message: data });
      };

      getMessage();
    }
  };

  const handleChangeMessageInput = (isTyping) => {};

  const handleSendMessage = async (message) => {
    await axios.post(serverApi.sendMessage, {
      from: currentUser._id,
      to: currentFriend._id,
      message: message,
    });
  };
  return (
    <div className={cx("home-container")}>
      <div className={cx("home-left-side")}>
        <ChatUser username={"asdfadfsa"}></ChatUser>
        <Search />
        {users.map((user) => (
          <ChatUser
            key={user._id}
            username={user.username}
            message={"asdf"}
            onClick={() => handleChangeCurrentFriend(user._id)}
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
                {currentFriend.message ? (
                  currentFriend.message.map((mes, index) => (
                    <Message
                      message={mes.message}
                      key={index}
                      isCurrentUser={mes.fromSelf}
                    ></Message>
                  ))
                ) : (
                  <div className={cx("chat-welcome")}>
                    <h3>Send something to your friend</h3>
                  </div>
                )}
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
