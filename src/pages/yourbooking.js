import { Select, Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function YourBooking() {
  const [posts, setPosts] = useState([]);
  const [books, setBooks] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const currentDate = new Date();

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
    return (
      post.username === currentUser.username &&
      post.status !== "Completed" &&
      // post.status !== "Confirmed"
      new Date(post.created_date) >= currentDate
    );
  });
  const filteredBooks = books.filter((book) => {
    return (
      book.status !== "Completed" && new Date(book.booked_date) >= currentDate
    );
  });

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [amount, setAmount] = useState("");

  const [searchParams] = useSearchParams();

  const handleEpay = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/epay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoFromStorage.token}`,
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (data.data) {
        window.location.replace(data.data.payment_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const PaymentAction = (post) => {
    handleEpay();
    handleComplete(post.id);
    setPosts((posts) =>
      posts.map((p) => (p.id === post.id ? { ...p, status: "Complete" } : p))
    );
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length != 0) {
      console.log(params);
    }
  }, []);
  console.log(books);

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
          Your bookings
        </div>

        {filteredPosts.reverse().map((post) => (
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
              <div className="flex justify-end">
                <Button
                  type="primary"
                  className={`bg-${
                    post.status === "Confirmed" ? "green-500" : "gray-500"
                  } text-white font-bold w-24 h-10 mr-2`}
                  disabled
                >
                  {post.status === "Confirmed" ? "Accepted" : "Pending"}
                </Button>
                {post.status === "Confirmed" && (
                  <div>
                    <Button
                      className="bg-green-500 text-white font-bold w-24 h-10"
                      onClick={showModal}
                      // onClick={handleEpay}
                      // onClick={() => {
                      //   handleComplete(post.id);
                      //   setPosts((posts) =>
                      //     posts.map((p) =>
                      //       p.id === post.id ? { ...p, status: "Complete" } : p
                      //     )
                      //   );
                      // }}
                    >
                      Complete
                    </Button>
                    <Modal
                      title="Payment"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okButtonProps={{ style: { display: "none" } }}
                      cancelButtonProps={{ style: { display: "none" } }}
                      className="flex justify-between"
                    >
                      <Button
                        className="flex-1 font-bold min-w-[150px] min-h-[180px] mr-[10px]
                      "
                        onClick={() => PaymentAction(post)}
                      >
                        <img
                          src={require("../image/pay.png")}
                          alt="cash"
                          className="w-[50px] ml-[35px]"
                        />
                        Pay with cash
                      </Button>
                      <Button className="flex-1 font-bold min-w-[150px] min-h-[180px] ml-[10px] ">
                        <img
                          src={require("../image/khalti.png")}
                          alt="khalti"
                          className="w-[120px] relative"
                          onClick={() => {
                            handleEpay();
                            handleComplete(post.id);
                            setPosts((posts) =>
                              posts.map((p) =>
                                p.id === post.id
                                  ? { ...p, status: "Complete" }
                                  : p
                              )
                            );
                          }}
                          // onClick={() => {
                          //   handleComplete(post.id);
                          //   setPosts((posts) =>
                          //     posts.map((p) =>
                          //       p.id === post.id
                          //         ? { ...p, status: "Complete" }
                          //         : p
                          //     )
                          //   );
                          // }}
                        />
                        Khalti
                      </Button>
                    </Modal>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
        {filteredBooks.reverse().map((book) => (
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

              <div className="flex justify-end">
                <Button
                  type="primary"
                  className={`bg-${
                    book.status === "Confirmed" ? "green-500" : "gray-500"
                  } text-white font-bold w-24 h-10 mr-2`}
                  disabled
                >
                  {book.status === "Confirmed" ? "Accepted" : "Pending"}
                </Button>
                {book.status === "Confirmed" && (
                  <div>
                    <Button
                      className="bg-green-500 text-white font-bold w-24 h-10"
                      onClick={showModal}
                      // onClick={handleEpay}
                      // onClick={() => {
                      //   handleComplete(post.id);
                      //   setPosts((posts) =>
                      //     posts.map((p) =>
                      //       p.id === post.id ? { ...p, status: "Complete" } : p
                      //     )
                      //   );
                      // }}
                    >
                      Complete
                    </Button>
                    <Modal
                      title="Payment"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okButtonProps={{ style: { display: "none" } }}
                      cancelButtonProps={{ style: { display: "none" } }}
                      className="flex justify-between"
                    >
                      <Button
                        className="flex-1 font-bold min-w-[150px] min-h-[180px] mr-[10px]
                      "
                        onClick={() => {
                          handleOk();
                          handleCompleteBook(book._id);
                          setBooks((books) =>
                            books.map((p) =>
                              p.id === book._id
                                ? { ...p, status: "Complete" }
                                : p
                            )
                          );
                        }}
                      >
                        <img
                          src={require("../image/pay.png")}
                          alt="cash"
                          className="w-[50px] ml-[35px]"
                        />
                        Pay with cash
                      </Button>
                      <Button className="flex-1 font-bold min-w-[150px] min-h-[180px] ml-[10px] ">
                        <img
                          src={require("../image/khalti.png")}
                          alt="khalti"
                          className="w-[120px] relative"
                          onClick={handleEpay}
                          // // onClick={() => {
                          // //   handleComplete(post.id);
                          // //   setPosts((posts) =>
                          // //     posts.map((p) =>
                          // //       p.id === post.id
                          // //         ? { ...p, status: "Complete" }
                          // //         : p
                          // //     )
                          // //   );
                          // // }}
                        />
                        Khalti
                      </Button>
                    </Modal>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default YourBooking;
