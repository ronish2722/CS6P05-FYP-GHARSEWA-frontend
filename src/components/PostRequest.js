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
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            View all professionals
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostRequest;
