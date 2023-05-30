import React, { useContext, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";
import { login, resetPassword } from "../actions/userAction";
import { Button, message, Modal } from "antd";

const LoginPage = (location, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const passwordResetState = useSelector((state) => state.passwordReset);
  const {
    loading: resetLoading,
    error: resetError,
    success: resetSuccess,
  } = passwordResetState;

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

  const resetPasswordHandler = () => {
    if (!email) {
      // show error message for empty email field
      message.error("Please enter your email address");
      return;
    }
    showModal();
    dispatch(resetPassword(email));
  };
  return (
    <div className="flex justify-between">
      <img
        src={require("../image/22.avif")}
        alt="login"
        className="w-[800px] h-screen"
      />
      <div className="p-7 w-full my-auto space-y-[70px]">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center text-sm">
            Welcome to GharSewa
          </p>
          {/* Render error message if error is present */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 6.066 4.652a1 1 0 00-1.414 1.414L8.586 10l-3.934 3.934a1 1 0 001.414 1.414L10 11.414l3.934 3.934a1 1 0 001.414-1.414L11.414 10l3.934-3.934a1 1 0 000-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}

          {/* <form onSubmit={(e) => loginUser(e)}> */}
          <form onSubmit={submitHandler}>
            <div className="flex flex-col p-[20px] space-y-[20px] pt-[30px] ">
              <label className="text-sm">Email</label>
              <input
                type="text"
                name="username"
                value={email}
                // placeholder="Enter username"
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 h-[40px]"
                required
              />
              <label className="text-sm">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                // placeholder="Enter password"
                className="border-b-2 h-[40px]"
                required
              />
              <p
                className="text-sm text-zinc-400"
                onClick={() => {
                  resetPasswordHandler();
                }}
              >
                Reset Password
              </p>

              <Modal
                title="Reset Password"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                  style: { backgroundColor: "gray", color: "white" },
                }}
              >
                {resetLoading && <div>Loading...</div>}
                {resetError && <div>{resetError}</div>}
                {resetSuccess && <div>Password reset email sent.</div>}
              </Modal>

              <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto text-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-zinc-400 font-thin text-sm">
          New to GharSewa?&nbsp;
          <u>
            {/* <Link
              to={redirect ? ` /register?redirect=${redirect}` : "/register"}
            > */}
            <Link to={"/register"}>Create a New Account</Link>
          </u>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
