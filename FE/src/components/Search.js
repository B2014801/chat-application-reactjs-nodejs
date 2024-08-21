import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import style from "./Component.module.scss";

const cx = classNames.bind(style);
function Search() {
  return (
    <div className={cx("search-container")}>
      <FontAwesomeIcon icon={faSearch} />
      <input type="text" placeholder="Search"></input>
    </div>
  );
}
export default Search;
