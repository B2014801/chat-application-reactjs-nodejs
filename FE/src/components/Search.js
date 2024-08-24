import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import style from "./Component.module.scss";

const cx = classNames.bind(style);
function Search({ sendUserName }) {
  const handleChange = (event) => {
    sendUserName(event.target.value);
  };
  return (
    <div className={cx("search-container")}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => handleChange(event)}
      ></input>
    </div>
  );
}
export default Search;
