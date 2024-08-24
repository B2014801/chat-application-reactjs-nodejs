import classNames from "classnames/bind";
import style from "./Component.module.scss";

const cx = classNames.bind(style);

function Message({ message, isCurrentUser = false, isShowAvata }) {
  return (
    <div
      className={cx("chat-user-container", "message", {
        "justify-content-end": isCurrentUser,
        "mt-1": !isShowAvata,
        "ml-2": !isShowAvata,
      })}
    >
      {isCurrentUser === false && isShowAvata ? (
        <div className={cx("avata")}>
          <img src="../../img/avata.jpg" alt=""></img>
        </div>
      ) : (
        ""
      )}
      <div
        className={cx("message-container", {
          "message-from-currentuser": isCurrentUser,
        })}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Message;
