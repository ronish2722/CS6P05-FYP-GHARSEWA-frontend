import React, { useContext } from "react";
import { logout } from "../actions/userAction";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white">
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
      <div className="flex flex-col h-screen w-[250px] bg-gray-900   fixed">
        <div className="flex flex-col justify-between px-8 py-4">
          <h1 className="my-auto font-black text-xl p-4 text-white pb-[50px]">
            <NavLink to="/" className=" text-white">
              GharSewa
            </NavLink>
          </h1>
          <p
            className={`px-4 my-auto mb-[10px] py-[10px] items-end cursor-pointer text-white hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
              location.pathname === "/profile" ||
              location.pathname === "/professional/profile"
                ? "bg-neutral-600"
                : ""
            }`}
          >
            <Link to="/profile">My Profile</Link>
          </p>

          <p
            className={`px-4 mb-2 py-[10px] text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
              location.pathname === "/professionals/" ? "bg-neutral-600" : ""
            }`}
          >
            <Link to="/professionals/" className="text-white ">
              Professionals
            </Link>
          </p>
          <p
            className={`px-4 mb-2 py-[10px] text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
              location.pathname === "/your-booking" ? "bg-neutral-600" : ""
            }`}
          >
            <Link to="/your-booking" className="text-white ">
              Your bookings
            </Link>
          </p>
          {userInfo && userInfo.isAdmin && (
            <p className="px-4 mb-2 py-[10px] text-white hover:bg-neutral-600 rounded-[5px] transition duration-300 ">
              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-800"
              >
                Admin
              </a>
            </p>
          )}

          {userInfo && userInfo.isProfessional && (
            <p
              className={`px-4 mb-2 py-[10px] text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
                location.pathname === "/public-post/" ? "bg-neutral-600" : ""
              }`}
            >
              <Link to="/public-post/" className="text-white ">
                Public Posts
              </Link>
            </p>
          )}

          {userInfo && userInfo.isProfessional && (
            <p
              className={`px-4 mb-2 py-[10px] text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
                location.pathname === "/private-post/" ? "bg-neutral-600" : ""
              }`}
            >
              <Link to="/private-post/" className="text-white ">
                Private Books
              </Link>
            </p>
          )}

          <p
            className={`px-4 mb-2 py-[10px] text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
              location.pathname === "/history/" ? "bg-neutral-600" : ""
            }`}
          >
            <Link to="/history/" className="text-white ">
              History
            </Link>
          </p>

          {userInfo && !userInfo.isProfessional && (
            <p
              className={`px-4 mb-2 py-[10px] text-white hover:bg-neutral-600 rounded-[5px] transition duration-300 ${
                location.pathname === "/register-professional"
                  ? "bg-neutral-600"
                  : ""
              }`}
            >
              <Link to="/register-professional" className="text-white">
                Become a Professional
              </Link>
            </p>
          )}
          <p
            className="px-4 my-auto  py-[10px] items-end cursor-pointer text-white  hover:bg-neutral-600 rounded-[5px] transition duration-300"
            onClick={logoutHandler}
          >
            Logout
          </p>
          <div className="flex-grow"></div>
          <div className="my-2">
            <Link to="/todo/">
              <button className="bg-neutral-600 text-white font-bold w-[180px] py-2 px-4 rounded-md hover:text-gray-900 absolute bottom-[20px]">
                To-do List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
