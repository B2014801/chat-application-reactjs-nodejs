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
          <img
            src="https://img.freepik.com/free-vector/isolated-sad-castaway-man-white-background_1308-85035.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723334400&semt=ais_hybrid"
            alt=""
          ></img>
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
