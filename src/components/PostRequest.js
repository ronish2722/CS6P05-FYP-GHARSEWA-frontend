import React from "react";
import { Button, Form, Input, Select } from "antd";

function PostRequest() {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        style={{
          maxWidth: 600,
        }}
        className="flex justify-between"
      >
        <Form.Item
          name="Repair"
          className="pt-[10px]"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Search for a category" />
        </Form.Item>
        <Form.Item
          name="Repair"
          className="pt-[10px]"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Search for a category" />
        </Form.Item>
        <Form.Item
          name="Repair"
          className="pt-[10px]"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Search for a category" />
        </Form.Item>
        <Form.Item
          name="Repair"
          className="pt-[10px]"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Search for a category" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-[#403D3A]">
            Search
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-[#403D3A]">
            View all professionals
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostRequest;
