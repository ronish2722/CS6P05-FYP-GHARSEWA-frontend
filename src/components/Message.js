import React from "react";
import { Alert, Space } from "antd";

const Message = ({ type, message }) => {
  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert message={message} type={type} />
      </Space>
    </div>
  );
};

export default Message;
