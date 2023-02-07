import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../image/fyp2.jpeg";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

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

          <form onSubmit={(e) => loginUser(e)}>
            <div className="flex flex-col p-[20px] space-y-[20px]">
              <label>Username</label>
              <input
                type="text"
                name="username"
                // placeholder="Enter username"
                className="border-b-2 h-[40px]"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
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
          New to GharSewa?<u> Create a New Account</u>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
