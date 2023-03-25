import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "antd";

function PublicPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/view-post/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="px-[100px] py-[10px]">
          <Card title={post.title} bordered={true} className="w-full">
            <h2></h2>
            <p>
              <b>Description:</b> {post.body}
            </p>
            <Button type="primary" className="bg-[#403D3A] w-[100px] h-[40px]">
              Accept
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default PublicPost;
