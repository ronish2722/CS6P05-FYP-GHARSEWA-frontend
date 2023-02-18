import React from "react";
import { Card, Tabs } from "antd";
import SearchWorker from "./SearchWorker";
import PostRequest from "./PostRequest";
import Professionals from "./Professionals";

function HomepageForm() {
  const items = [
    { label: "Search Workers", key: "item-1", children: <SearchWorker /> },
    { label: "Post a Request", key: "item-2", children: <PostRequest /> },
  ];
  return (
    <div>
      <Card className="w-[800px]" bordered={false}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          tabBarStyle={{ marginBottom: 0 }}
          items={items}
        />
      </Card>
    </div>
  );
}

export default HomepageForm;
