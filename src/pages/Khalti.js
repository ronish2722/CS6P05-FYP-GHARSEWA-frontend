import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Khalti = () => {
  const [posts, setPosts] = useState([]);
  const [books, setBooks] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const currentDate = new Date();

  // Fetch the current user information from localStorage
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleComplete = async (postId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/complete-post/${postId}/`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setPosts((posts) =>
        posts.map((p) => (p.id === postId ? { ...p, status: "Completed" } : p))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompleteBook = async (bookId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/complete-booking/${bookId}/`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setBooks((books) =>
        books.map((p) => (p.id === bookId ? { ...p, status: "Completed" } : p))
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-neutral-200 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md flex flex-col items-center">
        <img
          src={require("../image/khalti.png")}
          alt="cash"
          className="w-32 mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-700 text-center mb-8">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>
        <Link to="/your-booking">
          <button className="bg-primary-500  py-2 px-4 rounded-md hover:bg-primary-600">
            Back to Bookings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Khalti;
