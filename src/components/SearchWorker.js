import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";

import ViewProPage from "../pages/ViewProPage";

const SearchWorker = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        style={{
          maxWidth: 600,
        }}
      >
        <div className="flex">
          <Form.Item
            name="Search"
            className="pt-[10px] w-5/6"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Search for a category" />
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
          <Link to="/viewpro">
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
