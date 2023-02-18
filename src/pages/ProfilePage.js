import React from "react";
import { getUserDetails } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  // let { loginUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password doesnt match");
    } else {
      console.log("Update>>>");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-[20px] space-y-[20px]">
          <label>Name</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            // placeholder="Enter username"
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 h-[40px]"
          />
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            // placeholder="Enter username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 h-[40px]"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder="Enter password"
            className="border-b-2 h-[40px]"
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // placeholder="Enter password"
            className="border-b-2 h-[40px]"
          />

          <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
