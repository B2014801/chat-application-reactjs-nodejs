import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { serverApi } from "../url/apiUrl";
import style from "./auth.module.scss";

//SHOW PASS
const cx = classNames.bind(style);
function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (event) => {
    event.preventDefault();
    if (isValidUser()) {
      const { data } = await axios.post(serverApi.login, formData);
      if (data.status === true) {
        navigate("/");
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_USER,
          JSON.stringify(data.user)
        );
      } else {
        toast.error(data.message, toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const isValidUser = () => {
    const { username, password } = formData;
    if (username.trim().length === 0 || password.trim().length === 0) {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className={cx("login-container")}>
      <form
        className={cx("login-form")}
        onSubmit={(event) => handleLogin(event)}
      >
        <h1>Login</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder="User name"
            onChange={(event) => handleChange(event)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
          ></input>
          <button>SIGN IN</button>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Login;
