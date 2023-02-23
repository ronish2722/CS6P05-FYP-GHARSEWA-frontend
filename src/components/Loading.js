import React from "react";
import { Space, Spin } from "antd";

export const Loading = () => {
  return (
    <div>
      <Space
        direction="vertical"
        className="flex justify-center"
        style={{
          width: "100%",
        }}
      >
        <Space className="flex justify-center">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>
      </Space>
    </div>
  );
};
