import React, { useContext, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";
import { register } from "../actions/userAction";
import { message } from "antd";

const RegisterPage = (location, history) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message1, setMessage1] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  // let { loginUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [history, userInfo, redirect]);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (localStorage.getItem("registerMessage")) {
      setRegisterMessage(localStorage.getItem("registerMessage"));
      localStorage.removeItem("registerMessage");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage1("Password doesnt match");
      message.error("Password doesnt match");
    } else if (password.length < 8) {
      setMessage1("Password should be at least 8 characters long");
      message.error("Password should be at least 8 characters long");
    } else {
      dispatch(register(name, email, password));
      if (error) {
        setMessage1(error);
        message.error(error);
      } else {
        setMessage1(""); // Clear the error message
        navigate("/login");
        message.success("Please check email and verify before logging in");
      }
    }
  };
  return (
    <div className="flex justify-between">
      <div className="p-7 w-full my-auto space-y-[30px] h-screen">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center text-sm">
            Welcome to GharSewa
          </p>

          {/* <form onSubmit={(e) => loginUser(e)}> */}
          <form onSubmit={submitHandler}>
            <div className="flex flex-col p-[20px] space-y-[20px] text-sm">
              <label>Name</label>
              <input
                required
                type="text"
                name="username"
                value={name}
                // placeholder="Enter username"
                onChange={(e) => setName(e.target.value)}
                className="border-b-2 h-[40px]"
              />
              <label>Email</label>
              <input
                required
                type="text"
                name="username"
                // placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 h-[40px] text-sm"
              />
              <label>Password</label>
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // placeholder="Enter password"
                className="border-b-2 h-[40px] test"
              />
              <label>Confirm Password</label>
              <input
                required
                type="password"
                name="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // placeholder="Enter password"
                className="border-b-2 h-[40px]"
              />

              <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
                Register
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-zinc-400 font-thin text-sm">
          Have an Account?&nbsp;
          <u>
            <Link to={"/login"}>Sign In</Link>
          </u>
        </p>
      </div>
      {registerMessage && <div>{registerMessage}</div>}
      <img
        src={require("../image/02.jpg")}
        alt="login"
        className="w-[2000px] h-screen"
      />
    </div>
  );
};

export default RegisterPage;
