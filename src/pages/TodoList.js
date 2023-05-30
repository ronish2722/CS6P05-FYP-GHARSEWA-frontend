import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input, Modal, message, Badge } from "antd";
import { IconName } from "react-icons/ai";
import Sidebar from "../components/Sidebar";

function TodoList(taskId) {
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState(false);
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

  useEffect(() => {
    axios.get(`/api/tasks/${taskId}`).then((res) => {
      setCompleted(res.data.completed);
    });
  }, [taskId]);

  const handleComplete = (event) => {
    event.preventDefault();
    axios
      .put(`/api/tasks/${taskId}/`, {
        completed: completed,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

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
        message.success("Activity added");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the post");
    }
  };

  const handleUpdate = async (taskId, values) => {
    try {
      const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));

      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-todo/${taskId}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle successful update
        console.log(response.data);
        message.success("Todo updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update todo");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-todo/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle successful deletion
        console.log(response.data);
        message.success("Todo deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete todo");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(items);

  return (
    <div className=" bg-neutral-300 min-h-screen">
      <Sidebar />
      <img
        src={require("../image/01.jpg")}
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />
      <div>
        <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
          To-do List
        </div>
        <div>
          <Button
            onClick={showModal}
            cancelButtonProps={{ style: { display: "none" } }}
            className="ml-[1160px] mt-[10px] text-white bg-neutral-600"
          >
            Add an activity
          </Button>
          <Modal
            title="Add an Activity"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={null}
          >
            <Form onFinish={handleSubmit} className="">
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please input a title",
                  },
                ]}
                className=""
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
                className=""
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>

              <Button
                type="Ok"
                htmlType="submit"
                className="bg-slate-700 text-white"
                onClick={handleOk}
              >
                Add
              </Button>
            </Form>
          </Modal>

          <div className="my-3 p-3 rounded-[20px] mx-[80px] ml-[380px] min-h-[200px]">
            {items.map((item) => (
              <Card className="mb-3 p-3 bg-neutral-100">
                <div className="flex justify-between align-items-center">
                  <h2 className="mb-0 text-2xl font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <div>
                    {item.complete ? (
                      <span
                        className="px-2 py-1 rounded-full bg-green-500 text-white font-bold"
                        onClick={() =>
                          handleUpdate(item.id, {
                            title: item.title,
                            complete: !item.complete,
                          })
                        }
                      >
                        Completed
                      </span>
                    ) : (
                      <span
                        className="px-2 py-1 rounded-full bg-red-500 text-white font-bold"
                        onClick={() =>
                          handleUpdate(item.id, {
                            title: item.title,
                            complete: !item.complete,
                          })
                        }
                      >
                        Incomplete
                      </span>
                    )}
                    <Button
                      type="danger"
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-1 rounded-full bg-red-700 text-white font-bold mx-2"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="mt-3 mb-0">{item.description}</p>

                {/* <Button
                    type="primary"
                    onClick={() => handleComplete(item.id)}
                  >
                    Mark as {item.completed ? "Incomplete" : "Completed"}
                  </Button> */}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
