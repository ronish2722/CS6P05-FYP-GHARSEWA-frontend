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
    <div>
      <Form
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <div className="flex">
          <Form.Item name="category_name" className="pt-[10px] w-5/6">
            <Input required placeholder="Search for a category" />
          </Form.Item>

          <Form.Item className=" pt-[10px] pl-[10px]">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#403D3A] w-[100px]"
            >
              Search
            </Button>
          </Form.Item>
        </div>
        <Form.Item>
          <Link to="/professionals">
            <Button type="primary" htmlType="submit" className="bg-[#403D3A]">
              View all professionals
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SearchWorker;
