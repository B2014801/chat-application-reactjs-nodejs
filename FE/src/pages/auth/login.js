import classNames from "classnames/bind";
import style from "./auth.module.scss";
import { Link } from "react-router-dom";

//SHOW PASS
const cx = classNames.bind(style);
function Login() {
  return (
    <div className={cx("login-container")}>
      <form className={cx("login-form")}>
        <h1>Login</h1>
        <div>
          <input type="text" placeholder="User name"></input>
          <input type="text" placeholder="Password"></input>
          <button>SIGN IN</button>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;
