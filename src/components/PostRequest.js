import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dropdown,
  Form,
  Input,
  TimePicker,
  Space,
  Modal,
  message,
  Select,
  DatePicker,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";

function PostRequest() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { RangePicker } = DatePicker;

  // Disable dates greater than or equal to the current date
  const disabledDate = (current) => {
    const currentDate = new Date();
    return current && current <= currentDate;
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories/");
        setCategories(data);
        setSelectedCategory(data[0]?.name || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  console.log(categories);

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
          created_date: values.created_date,
          start_time: values.start_time.format("HH:mm"),
          body: values.body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail);
        message.error("An error occurred while creating the post");
      } else {
        const postData = await response.json();
        // Do something with the created post data
        message.success("Your post has been successfully posted");
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the post");
      message.error("An error occurred while creating the post");
    }
  };

  return (
    <div>
      <Form
        className="w-full p-4 rounded-lg  bg-white"
        form={form}
        onFinish={handleSubmit}
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
                message: "Please select a category",
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
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
          <Form.Item
            name="created_date"
            label="Date"
            className="pt-[10px]"
            rules={[
              {
                required: true,
                message: "Please enter a Date",
              },
            ]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>

          <Button
            type="primary"
            onClick={showModal}
            className="bg-[#403D3A] my-[15px]"
          >
            Add a Description
          </Button>
          <Modal
            title="Description"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              style: { backgroundColor: "gray", color: "white" },
            }}
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
        <div className="flex justify-center ">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-gray-200 text-black font-semibold hover:bg-gray-300 w-[100px]"
              size="large"
            >
              Post
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default PostRequest;
