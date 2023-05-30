import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import Sidebar from "./Sidebar";

function PrivatePost() {
  const [bookings, setBookings] = useState([]);
  const currentDate = new Date(); // Get the current date

  // Filter the bookings array to include only the posts with booked_date greater than the current date
  const filteredBookings = bookings.filter(
    (booking) => new Date(booking.booked_date) > currentDate
  );

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get("/api/view-book/", {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      });
      setBookings(response.data);
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/accept-booking/${bookId}/`,
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

  const handleCancel = async (bookId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/decline-booking/${bookId}/`,
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
  console.log(bookings);
  return (
    <div className="bg-neutral-300 min-h-screen">
      <Sidebar />
      <img
        src={require("../image/01.jpg")}
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />
      <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
        Private Posts
      </div>
      {filteredBookings.map((booking) => (
        <div key={booking._id} className="px-[100px] py-[10px]">
          <Card
            title={booking.user + " has booked you"}
            bordered={true}
            className="max-w-[895px] ml-[300px] bg-neutral-100"
          >
            <div className="pb-[20px]">
              <div>
                <p>
                  <b className="text-lg font-bold mb-2">
                    Location: {booking.locations}
                  </b>
                </p>
                <p className=" text-lg font-bold text-gray-500 flex">
                  Time:{" "}
                  {new Date(booking.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <p className="ml-[50px]">
                    Date: {new Date(booking.booked_date).toLocaleDateString()}
                  </p>
                </p>
              </div>
              <p></p>
            </div>

            <Button
              type="primary"
              className="bg-[#403D3A] w-[100px] h-[40px]"
              onClick={() => {
                handleAccept(booking._id);
                setBookings((bookings) =>
                  bookings.map((b) =>
                    b._id === booking._id ? { ...b, status: "Confirmed" } : b
                  )
                );
              }}
              disabled={booking.status === "Confirmed"}
            >
              Accept
            </Button>
            {booking.status === "Confirmed" && (
              <Button
                type="danger"
                className="bg-[#8B0000] w-[100px] h-[40px] ml-2"
                onClick={() => {
                  handleCancel(booking._id);
                  setBookings((bookings) =>
                    bookings.map((b) =>
                      b._id === booking._id ? { ...b, status: "Pending" } : b
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

export default PrivatePost;
