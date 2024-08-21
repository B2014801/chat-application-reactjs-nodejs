import classNames from "classnames/bind";
import style from "./Component.module.scss";

const cx = classNames.bind(style);

function ChatUser({ username, message, hover = true, isDisable = false }) {
  return (
    <div className={cx("chat-user-container", { "user-hover": hover })}>
      <div className={cx("avata")}>
        <img
          src="https://img.freepik.com/free-vector/isolated-sad-castaway-man-white-background_1308-85035.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723334400&semt=ais_hybrid"
          alt=""
        ></img>
      </div>
      <div className={cx("chat-user-infor")}>
        <h4>{username}</h4>
        <p className={cx({ "disable-message": isDisable })}>{message}</p>
      </div>
    </div>
  );
}
export default ChatUser;
