import React, { useState } from "react";
import { Button, Dropdown, Form, Input, TimePicker, Space, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";

function PostRequest() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [error, setError] = useState(null);
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

  const handleSubmit = async (values) => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await fetch("http://127.0.0.1:8000/api/create-post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoFromStorage.token}`, // assuming you're using JWT authentication and the token is stored in local storage
        },

        body: JSON.stringify({
          title: values.title,
          locations: values.locations,
          categories: values.categories,
          start_time: values.start_time.format("HH:mm"),
          body: values.body,
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
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        <div className="flex justify-between">
          <Form.Item
            name="title"
            label="Title"
            className="pt-[10px]"
            rules={[
              {
                required: true,
                message: "Please enter a title",
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="locations"
            label="Location"
            className="pt-[10px]"
            rules={[
              {
                required: true,
                message: "Please enter a Location",
              },
            ]}
          >
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item
            name="categories"
            label="Category"
            className="pt-[10px]"
            rules={[
              {
                required: true,
                message: "Please enter a Category",
              },
            ]}
          >
            <Input placeholder="Category" />
            {/* <Dropdown menu={"1"}>
            <Space>
              Categories
              <DownOutlined />
            </Space>
          </Dropdown> */}
          </Form.Item>
        </div>
        <div className="flex justify-between">
          <Form.Item
            name="start_time"
            label="Time"
            className="pt-[10px]"
            rules={[
              {
                required: true,
                message: "Please enter a Time",
              },
            ]}
          >
            <TimePicker format="h:mm" />
          </Form.Item>
          <Button
            type="primary"
            onClick={showModal}
            className="bg-[#403D3A] my-[15px]"
          >
            Add a Description
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form.Item
              name="body"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            {error && <div style={{ color: "red" }}>{error}</div>}
          </Modal>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#403D3A] w-[100px]"
          >
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostRequest;
