import { Select, Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function YourBooking() {
  const [posts, setPosts] = useState([]);
  const [books, setBooks] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  // Fetch the current user information from localStorage
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    setCurrentUser(userInfoFromStorage);

    axios
      .get("/api/view-post/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("/api/get-user-bookings/", {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      })
      .then((response) => setBooks(response.data));
  }, []);

  // Filter the posts array based on the current user's username
  const filteredPosts = posts.filter((post) => {
    return post.username === currentUser.username && post.status == "Completed";
  });

  const filteredBooks = books.filter((book) => {
    return book.status == "Completed";
  });

  // Render the filtered posts
  return (
    <div className="flex bg-neutral-200 min-h-screen">
      <Sidebar />
      <div className="w-full">
        {/* <div className="bg-slate-800 w-full h-[250px] text-neutral-100  text-5xl font-black flex items-center pl-[400px]  mb-[30px]">
          YOUR BOOKINGS
        </div> */}

        <img
          src={require("../image/01.jpg")}
          alt="home"
          className=" w-screen h-[300px] object-cover"
        />
        <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
          History
        </div>

        {filteredPosts.map((post) => (
          <div key={post.id} className="py-6 ml-[300px]">
            <Card
              title={post.title}
              bordered={true}
              className="bg-neutral-100 rounded-lg shadow-md p-6 mx-4 lg:mx-[100px]  "
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 font-semibold">{post.username}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                  })}
                  ,
                  {new Date(post.start_time).toLocaleString("en-GB", {
                    // day: "2-digit",
                    // month: "2-digit",
                    // year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <h2 className="text-lg font-bold mb-2">{post.categories_name}</h2>
              <p className="text-gray-700 mb-4">{post.body}</p>
            </Card>
          </div>
        ))}
        {filteredBooks.map((book) => (
          <div key={book._id} className="py-6 ml-[300px]">
            <Card
              title={book.professional}
              bordered={true}
              className="bg-neutral-100 rounded-lg shadow-md p-6 mx-4 lg:mx-[100px]  "
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 font-semibold">
                  You booked {book.professional}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(book.booked_date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                  })}
                  ,
                  {new Date(book.start_time).toLocaleString("en-GB", {
                    // day: "2-digit",
                    // month: "2-digit",
                    // year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <h2 className="text-lg font-bold mb-2">{book.locations}</h2>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default YourBooking;
