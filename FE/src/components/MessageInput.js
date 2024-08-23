import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./Component.module.scss";
import { useState } from "react";

const cx = classNames.bind(style);
function MessageInput({ sendIsTyping, onSubmit }) {
  const [message, setMessage] = useState("");
  const hanldeChange = (event) => {
    sendIsTyping(true);
    setMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessage("");
      onSubmit(message);
    }
  };
  return (
    <div className={cx("message-input-container")}>
      <div className={cx("message-input")}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            value={message}
            onChange={(event) => hanldeChange(event)}
          ></input>
          <button>
            <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
          </button>
        </form>
      </div>
    </div>
  );
}
export default MessageInput;
