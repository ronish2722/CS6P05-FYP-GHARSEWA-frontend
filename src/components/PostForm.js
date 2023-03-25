import React from "react";
import { Card, Tabs } from "antd";
import PublicPost from "./PublicPost";
import PrivatePost from "./PrivatePost";

function HomepageForm() {
  const items = [
    { label: "Public", key: "item-1", children: <PublicPost /> },
    { label: "Private", key: "item-2", children: <PrivatePost /> },
  ];
  return (
    <div>
      <Card className="w-full" bordered={false}>
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
