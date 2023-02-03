import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { contextData } = useContext(AuthContext);
  let { loginUser } = contextData;

  return (
    <div>
      <form onSubmit={(e) => loginUser(e)}>
        <input type="text" name="username" placeholder="Enter username" />
        <input type="password" name="password" placeholder="Enter password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
