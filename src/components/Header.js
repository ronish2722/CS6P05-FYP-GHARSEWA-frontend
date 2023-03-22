import React, { useContext } from "react";
import { logout } from "../actions/userAction";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";

const Header = () => {
  // let { user, logoutUser } = useContext(AuthContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* <div>
        <Link to="/">Home</Link>
        <span>|</span>
        {user ? (
          <p onClick={logoutUser}>Logout</p>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {user && <p>Hello {user.username}</p>}
      </div> */}
      <div className="flex justify-between px-[50px] py-[15px] border-b-2">
        <h1 className="my-auto font-black text-lg">
          <NavLink to="/">GharSewa</NavLink>
        </h1>
        <div className="flex">
          <p className="px-[30px] my-auto items-end">
            <Link to={"/profile"}>My Profile</Link>
          </p>
          <p className="px-[30px] my-auto items-end" onClick={logoutHandler}>
            Logout
          </p>
          {userInfo && userInfo.isAdmin && (
            <p className="px-[30px] my-auto items-end">
              <Link to="/admin/userlist">Users</Link>
            </p>
          )}
          {userInfo && userInfo.isProfessional && (
            <p className="px-[30px] my-auto items-end">
              <Link to="/posts/">Requests</Link>
            </p>
          )}

          <button className="bg-slate-700 w-[120px] h-[40px] text-white rounded-[15px]">
            To-do List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
