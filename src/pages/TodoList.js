import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input } from "antd";
import { IconName } from "react-icons/ai";
import Header from "../components/Header";

function TodoList() {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

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

  const handleSubmit = async (values) => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await fetch("/api/create-todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoFromStorage.token}`, // assuming you're using JWT authentication and the token is stored in local storage
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail);
      } else {
        const postData = await response.json();
        // Do something with the created post data
        console.log(postData);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the post");
    }
  };

  return (
    <div>
      <Header className="bg-white" />
      <div style={{ position: "relative" }}>
        <img
          src={require("../image/todo.avif")}
          alt="todo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            filter: "blur(2px)",
            zIndex: -1,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Form onFinish={handleSubmit} className="mx-[100px] border">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input a title",
                },
              ]}
              className="p-[20px] px-[100px]"
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="description"
              rules={[
                {
                  required: true,
                  message: "Please input a description",
                },
              ]}
              className="px-[100px]"
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-slate-700 text-white mx-[100px]"
            >
              Add
            </Button>
          </Form>
          {/* <table className="w-full border p-[100px]">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
          <div className="my-3 p-3 rounded-[20px] mx-[20px] w-full min-h-[200px]">
            {items.map((item) => (
              <Card key={item.id} className="mb-3">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.completed ? "Yes" : "No"}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
