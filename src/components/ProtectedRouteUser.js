import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ProtectedRouteUser(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo && !userInfo.isProfessional && !userInfo.isAdmin) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRouteUser;
