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
  return <div>ProfilePage</div>;
}

export default ProfilePage;
