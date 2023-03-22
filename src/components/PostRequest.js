import React, { useState } from "react";
import { Button, Form, Input } from "antd";

function PostRequest() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await fetch("/api/create-post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoFromStorage.token}`, // assuming you're using JWT authentication and the token is stored in local storage
        },
        body: JSON.stringify({
          title: values.title,
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
