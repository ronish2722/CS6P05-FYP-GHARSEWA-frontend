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

  console.log(posts);

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const handleAccept = async (postId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/accept-post/${postId}/`,
        { status: "Confirmed" },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (postId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/decline-post/${postId}/`,
        { status: "Pending" },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="px-[100px] py-[10px]">
          <Card title={post.title} bordered={true} className="w-full">
            <p>{post.username}</p>
            <h2>{post.categories_name}</h2>
            <p>
              <b>Description:</b> {post.body}
            </p>
            <p>{post.created_date}</p>
            <Button
              type="primary"
              className="bg-[#403D3A] w-[100px] h-[40px]"
              onClick={() => {
                handleAccept(post.id);
                setPosts((posts) =>
                  posts.map((p) =>
                    p.id === post.id ? { ...p, status: "Confirmed" } : p
                  )
                );
              }}
              disabled={post.status === "Confirmed"}
            >
              Accept
            </Button>
            {post.status === "Confirmed" && (
              <Button
                type="danger"
                className="bg-[#8B0000] w-[100px] h-[40px] ml-2"
                onClick={() => {
                  handleCancel(post.id);
                  setPosts((posts) =>
                    posts.map((p) =>
                      p.id === post.id ? { ...p, status: "Pending" } : p
                    )
                  );
                }}
              >
                Cancel
              </Button>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
}

export default PublicPost;
