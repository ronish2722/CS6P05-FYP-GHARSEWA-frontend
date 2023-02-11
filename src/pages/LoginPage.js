import React, { useContext, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";
import { login } from "../actions/userAction";

const LoginPage = (location, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  // let { loginUser } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex justify-between">
      <img
        src={require("../image/fyp2.jpeg")}
        alt="login"
        className="w-[854px] h-screen"
      />
      <div className="p-7 w-full my-auto space-y-[100px]">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center">
            Welcome to GharSewa
          </p>

          {/* <form onSubmit={(e) => loginUser(e)}> */}
          <form onSubmit={submitHandler}>
            <div className="flex flex-col p-[20px] space-y-[20px]">
              <label>Username</label>
              <input
                type="text"
                name="username"
                // placeholder="Enter username"
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 h-[40px]"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                // placeholder="Enter password"
                className="border-b-2 h-[40px]"
              />

              <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
                Submit
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-zinc-400 font-thin">
          New to GharSewa?
          <u>
            <Link
              to={redirect ? ` /register?redirect=${redirect}` : "/register"}
            >
              Create a New Account
            </Link>
          </u>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
