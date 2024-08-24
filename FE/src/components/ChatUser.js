import classNames from "classnames/bind";
import style from "./Component.module.scss";

const cx = classNames.bind(style);

function ChatUser({
  username,
  message,
  hover = true,
  isDisable = false,
  onClick,
}) {
  return (
    <div
      className={cx("chat-user-container", { "user-hover": hover })}
      onClick={onClick}
    >
      <div className={cx("avata")}>
        <img src="../../img/avata.jpg" alt=""></img>
      </div>
      <div className={cx("chat-user-infor")}>
        <h4>{username}</h4>
        <p className={cx({ "disable-message": isDisable })}>{message}</p>
      </div>
    </div>
  );
}
export default ChatUser;
