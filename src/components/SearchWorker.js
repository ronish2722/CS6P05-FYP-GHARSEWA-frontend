import { Button, Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "../actions/professionalAction";

const SearchWorker = () => {
  // const [formData, setFormData] = useState({});

  // const onFinish = (values) => {
  //   setFormData(values);
  //   console.log(values);
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(setFormData(values));
    console.log(values);
    navigate("/viewpro");
  };

  return (
    <div className="flex justify-center items-center">
      <Form className="w-full p-4 rounded-lg  bg-white" onFinish={onFinish}>
        <div className="flex items-center mb-4">
          <h1 className="text-lg font-bold">Search for a category:</h1>
        </div>

        <div className="flex items-center">
          <Form.Item
            name="category_name"
            className="flex-1 mr-4 mb-0"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input
              className="rounded-none"
              placeholder="e.g. plumbing, painting, etc."
              size="large"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#403D3A] text-white font-semibold"
              size="large"
            >
              Search
            </Button>
          </Form.Item>
        </div>

        <div className="flex justify-center mt-6">
          <Link to="/professionals">
            <Button
              type="primary"
              className="bg-gray-200 text-black font-semibold hover:bg-gray-300"
              size="large"
            >
              View all professionals
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default SearchWorker;
