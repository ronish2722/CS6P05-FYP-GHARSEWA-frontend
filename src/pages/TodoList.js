import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

function TodoList() {
  const [items, setItems] = useState([]);

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      if (userInfoFromStorage) {
        config.headers["Authorization"] = `Bearer ${userInfoFromStorage.token}`;
      }
      return config;
    });

    axios.get("/api/todo").then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.completed ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
