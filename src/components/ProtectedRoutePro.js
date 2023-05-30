import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ProtectedRoutePro(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo.isProfessional) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoutePro;
