import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";
import { getUserDetails } from "../actions/userAction";
import { Loading } from "../components/Loading";
import Message from "../components/Message";
import { message } from "antd";

const UserUpdateScreen = (match, history) => {
  const { id } = useParams();
  const userId = id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //   const redirect = location.search ? location.search.split("=")[1] : "/";

  const userDetails = useSelector((state) => state.userDetails);

  const { error, loading, user } = userDetails;
  console.log(userDetails);

  // let { loginUser } = useContext(AuthContext);

  useEffect(() => {
    //   if (userInfo) {
    //     navigate(redirect);
    //   }
    // if (!user.name || user._id !== Number(userId)) {
    //   dispatch(getUserDetails(userId));
    // } else {
    //   setName(user.name);
    //   setEmail(user.email);
    //   setIsAdmin(user.isAdmin);
    // }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex ">
      <img
        src={require("../image/fyp2.jpeg")}
        alt="login"
        className="w-[854px] h-screen"
      />
      <div className="w-screen">
        <Link to="/admin/userlist">Go back</Link>
        <div className="p-7 w-full my-auto space-y-[100px]">
          <h1 className="text-3xl font-black text-center">GharSewa</h1>
          <div>
            <p className="text-zinc-400 font-thin text-center">Edit User</p>
            {loading ? (
              <Loading />
            ) : error ? (
              <Message type="danger" message={error} />
            ) : (
              <form onSubmit={submitHandler}>
                <div className="flex flex-col p-[20px] space-y-[20px]">
                  <label>Name</label>
                  <input
                    type="text"
                    name="username"
                    value={name}
                    // placeholder="Enter username"
                    onChange={(e) => setName(e.target.value)}
                    className="border-b-2 h-[40px]"
                  />
                  <label>Email</label>
                  <input
                    type="text"
                    name="username"
                    // placeholder="Enter username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-b-2 h-[40px]"
                  />
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="border-b-2 h-[40px]"
                    />
                    <label className="ml-[10px] mt-[8px]">isAdmin</label>
                  </div>
                  <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
                    Edit
                  </button>
                </div>
              </form>
            )}
            {/* <form onSubmit={(e) => loginUser(e)}> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateScreen;
