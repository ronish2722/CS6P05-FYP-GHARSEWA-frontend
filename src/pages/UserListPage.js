import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import Message from "../components/Message";
import { listUsers, deleteUsers } from "../actions/userAction";
import Header from "../components/Header";
// import { Table } from "antd";
import Column from "antd/es/table/Column";
import { Button } from "antd";

const UserListPage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userLogin;

  console.log(userList);

  useEffect(() => {
    // if (userInfo && userInfo.isAdmin) {
    dispatch(listUsers());
    // } else {
    //   navigate("/");
    // }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      dispatch(deleteUsers(id));
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    // <i className="fas fa-check" style={{ color: "green" }}></i>
                    <p>Yes</p>
                  ) : (
                    // <i className="fas fa-check" style={{ color: "red" }}></i>
                    <p>No</p>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListPage;
