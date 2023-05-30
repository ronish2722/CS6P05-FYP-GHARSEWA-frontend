import React, { useContext } from "react";
import { logout } from "../actions/userAction";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { DownOutlined } from "@ant-design/icons";

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

  const items = [
    {
      label: <Link to="/public-post/">Public Post</Link>,
      key: "0",
    },
    {
      label: <Link to="/private-post/">Private Books</Link>,
      key: "1",
    },
  ];

  return (
    <div className="bg-white  w-screen">
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
          <p className="px-[30px] my-auto items-end text-sm">
            <Link to={"/profile"}>My Profile</Link>
          </p>
          <p className="px-[30px] my-auto items-end text-sm">
            <Link to={"/your-booking"}>Your bookings</Link>
          </p>
          <p className="px-[30px] my-auto items-end text-sm">
            <Link to={"/history"}>History</Link>
          </p>
          <p
            className="px-[30px] my-auto items-end text-sm"
            onClick={logoutHandler}
          >
            Logout
          </p>
          {userInfo && userInfo.isAdmin && (
            <p className="px-[30px] my-auto items-end text-sm">
              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
              </a>
            </p>
          )}
          {userInfo && userInfo.isProfessional && (
            <Dropdown
              menu={{
                items,
              }}
              className="px-[30px] my-auto items-end text-sm"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-sm">
                  Requests
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
          {userInfo && !userInfo.isProfessional && !userInfo.isAdmin && (
            <p className="px-[30px] my-auto items-end text-sm">
              <Link to="/register-professional">Become a Professional</Link>
            </p>
          )}

          <Link to="/todo/">
            <button className="bg-slate-700 w-[120px] h-[40px] text-white rounded-[15px] text-sm">
              To-do List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
