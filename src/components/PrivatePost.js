import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "antd";

function PrivatePost() {
  const [bookings, setBookings] = useState([]);

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

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking._id} className="px-[100px] py-[10px]">
          <Card title={booking._id} bordered={true} className="w-full">
            <h2></h2>
            <p>
              <b>{booking.user}</b>
            </p>
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
