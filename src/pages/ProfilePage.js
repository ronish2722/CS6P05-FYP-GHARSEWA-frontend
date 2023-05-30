import React from "react";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constant/userConstant";
import Sidebar from "../components/Sidebar";
import { Card } from "antd";
function ProfilePage({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, history, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password doesn't match");
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="bg-neutral-300 min-h-screen">
      <Sidebar />
      <img
        src={require("../image/01.jpg")}
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />
      <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
        Profile
      </div>
      <Card className="mt-[20px] ml-[400px] max-w-[880px] ml-[300px] bg-neutral-100">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col p-[20px] space-y-[20px]">
            <label>Name</label>
            <input
              required
              type="text"
              name="username"
              value={userInfo.name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 h-[40px]"
            />
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              value={userInfo.email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 h-[40px]"
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 h-[40px]"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm password"
              value={userInfo.confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-b-2 h-[40px]"
            />
            <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
              Update
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ProfilePage;
