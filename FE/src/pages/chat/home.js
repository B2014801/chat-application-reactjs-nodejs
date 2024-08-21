import ChatUser from "../../components/ChatUser";
import classNames from "classnames/bind";
import style from "./home.module.scss";
import Search from "../../components/Search";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";

const cx = classNames.bind(style);
function Home() {
  return (
    <div className={cx("home-container")}>
      <div className={cx("home-left-side")}>
        <ChatUser username={"asdfadfsa"}></ChatUser>
        <Search />
      </div>
      <div className={cx("home-right-side")}>
        <div className={cx("header")}>
          <ChatUser username={"asdfadfsa"} hover={false}></ChatUser>
        </div>
        <div className={cx("body")}>
          <div className={cx("message-list")}>
            <Message
              message={
                "dfadfasdffdjghsdfsdfgurfsudfhsdufydfuhasufhasdfhuasdhfasjkdfhsdhfajksdhfuihsfajskdhfaiuyfssdjkfhaskdfhasdjkfhasdjkfhasdjkfhasdkjfhasdjkfhasd"
              }
              isCurrentUser={true}
            ></Message>
            <Message
              message={
                "dfadfasdffdjghsdfsdfgurfsudfhsdufydfuhasufhasdfhuasdhfasjkdfhsdhfajksdhfuihsfajskdhfaiuyfssdjkfhaskdfhasdjkfhasdjkfhasdjkfhasdkjfhasdjkfhasd"
              }
            ></Message>
          </div>
          <MessageInput></MessageInput>
        </div>
      </div>
    </div>
  );
}
export default Home;
