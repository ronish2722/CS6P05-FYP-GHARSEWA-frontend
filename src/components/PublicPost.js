import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Button, Card, message } from "antd";
import { Select, Popconfirm } from "antd";
import { Pagination } from "antd";
function PublicPost() {
  const { Option } = Select;
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const currentDate = new Date(); // Get the current date
  useEffect(() => {
    setCurrentUser(userInfoFromStorage);

    axios
      .get("/api/view-post/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);
  console.log(currentDate);
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredPosts = selectedCategory
    ? posts.filter(
        (post) =>
          post.categories_name === selectedCategory &&
          post.username !== currentUser.username &&
          post.status !== "Completed" &&
          new Date(post.created_date) >= currentDate
      )
    : posts.filter(
        (post) =>
          post.username !== currentUser.username &&
          post.status !== "Completed" &&
          new Date(post.created_date) >= currentDate
      );

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleAccept = async (postId) => {
    try {
      const confirmedPost = posts.find((post) => post.status === "Confirmed");
      if (confirmedPost) {
        // There is already a post with "Confirmed" status
        // You can display a message or handle the scenario as needed

        message.error(
          "Another post is already confirmed. Cannot accept another post."
        );
        return;
      }
      console.log(postId);
      await axios.put(
        `http://127.0.0.1:8000/api/accept-post/${postId}/`,
        { status: "Confirmed" },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setPosts((posts) =>
        posts.map((p) => (p.id === postId ? { ...p, status: "Confirmed" } : p))
      );
      message.success("Accepted");
    } catch (error) {
      console.log(error);
      message.error("Error while accpeting the post");
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
      setPosts((posts) =>
        posts.map((p) => (p.id === postId ? { ...p, status: "Pending" } : p))
      );
      message.success("Cancelled");
    } catch (error) {
      console.log(error);
      message.error("Error while cancelling the post");
    }
  };
  console.log(posts);
  const pageSize = 4;
  const [current, setCurrent] = useState(1);
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const onPageChange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  const currentPosts = filteredPosts.slice(startIndex, endIndex + 1);
  return (
    <div className=" bg-neutral-300 min-h-screen">
      <Sidebar />
      <img
        src={require("../image/01.jpg")}
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />
      <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
        Public Posts
      </div>
      <div className="flex justify-center mt-[10px] ml-[200px]">
        <Select
          defaultValue=""
          style={{ width: 200 }}
          onChange={handleCategoryChange}
        >
          <Option value="">All Categories</Option>
          {Array.from(new Set(posts.map((p) => p.categories_name))).map(
            (category) => (
              <Option value={category} key={category}>
                {category}
              </Option>
            )
          )}
        </Select>
      </div>
      {currentPosts.reverse().map((post) => (
        <div key={post.id} className="px-[100px] py-[10px] ">
          <Card
            title={post.title}
            bordered={true}
            className="ml-[300px] max-w-[880px] bg-white rounded-lg bg-neutral-100 shadow-md p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600 font-semibold">{post.username}</p>
              <p className="text-gray-500">
                {new Date(post.created_date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                ,
                {new Date(post.start_time).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <h2 className="text-lg font-bold mb-2">{post.categories_name}</h2>
            <p className="text-gray-700 mb-4">{post.body}</p>
            <div className="flex justify-end">
              {/* <Popconfirm
                title="Accept the post"
                description="Are you sure to Accept this p?"
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  style: { backgroundColor: "#595959", color: "white" },
                }}
              > */}
              <Button
                type="primary"
                className="bg-[#403D3A] text-white font-bold w-[100px] h-[40px] mr-2"
                onClick={() => handleAccept(post.id)}
                disabled={post.status === "Confirmed"}
              >
                Accept
              </Button>
              {/* </Popconfirm> */}

              {post.status === "Confirmed" && (
                <Popconfirm
                  title="Cancel the post"
                  description="Are you sure to Cancel this post?"
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                    style: { backgroundColor: "#595959", color: "white" },
                  }}
                >
                  <Button
                    type="danger"
                    className="bg-[#8B0000] text-white font-bold w-[100px] h-[40px]"
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
                </Popconfirm>
              )}
            </div>
          </Card>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 ml-[200px]">
          <Pagination
            current={current}
            total={totalItems}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default PublicPost;
