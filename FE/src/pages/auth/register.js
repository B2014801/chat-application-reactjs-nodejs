import classNames from "classnames/bind";
import style from "./auth.module.scss";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverApi } from "../url/apiUrl";

//SHOW PASS
const cx = classNames.bind(style);
function Register() {
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
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    }));
  };
  const isValidUser = () => {
    let { username, password, confirmPassword } = formData;
    if (username === "") {
      toast.error("Username not empty", toastOptions);
      return false;
    }
    if (username.length <= 2) {
      toast.error("Username must have 4 characters or more", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password not empty", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must have 8 characters or more", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Confirm Password do not match", toastOptions);
      return false;
    }
    return true;
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    let { username, password } = formData;
    if (isValidUser()) {
      let result = await axios.post(serverApi.register, {
        username: username,
        password: password,
      });
      console.log(result);
    }
  };
  return (
    <div className={cx("login-container")}>
      <form
        className={cx("login-form")}
        onSubmit={(event) => handleRegister(event)}
      >
        <h1>Register</h1>
        <div>
          <input
            type="text"
            placeholder="User name"
            name="username"
            onChange={(event) => handleChange(event)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          ></input>
          <button>SIGN UP</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Register;
