import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./Component.module.scss";

const cx = classNames.bind(style);
function MessageInput() {
  return (
    <div className={cx("message-input-container")}>
      <div className={cx("message-input")}>
        <input></input>
        <button>
          <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
export default MessageInput;
