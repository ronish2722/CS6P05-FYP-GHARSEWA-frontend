import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Rate, Button } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { listProfessionalsDetails } from "../actions/professionalAction";
import { Loading } from "../components/Loading";
import Message from "../components/Message";
import axios from "axios";
import { useParams } from "react-router-dom";
import { message } from "antd";
import Review from "../components/Review";
import GetReviews from "../components/GetReviews";
import { listReviews } from "../actions/reviewsAction";

function ProfessionalsView() {
  const [IsBooked, setIsBooked] = useState(false);
  const [bookId, setBookId] = useState(null); // Define bookId in the state
  const [bookings, setBookings] = useState([]);

  const dispatch = useDispatch();
  const professionalDetail = useSelector((state) => state.professionalDetail);
  const { error, loading, professional } = professionalDetail;
  const { id } = useParams();
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, averageRating } = reviewsState;
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    dispatch(listProfessionalsDetails(id));
    dispatch(listReviews(id));
  }, [dispatch]);

  useEffect(() => {
    const checkBookingStatus = async () => {
      if (userInfoFromStorage) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/view-book/`,
            {
              headers: {
                Authorization: `Bearer ${userInfoFromStorage.token}`,
              },
            }
          );
          setIsBooked(true);
        } catch (error) {
          setIsBooked(false);
        }
      }
    };

    checkBookingStatus();
  }, [id, userInfoFromStorage]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-user-bookings/`,
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setBookings(response.data);
    };

    fetchBookings();
  }, []);

  const handleBookClick = async () => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await axios.post(
        `http://127.0.0.1:8000/api/book-professional/${id}/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      const { book_id } = response.data;
      message.success(`Booking confirmed with ID: ${book_id}`);
      setIsBooked(true);
      setBookId(book_id); // Set bookId in the state
      // Redirect to a success page or show a success message
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cancel-booking/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      message.success(`Booking cancelled successfully`);
      setIsBooked(false);
      setBookId(null); // Reset bookId in the state
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <Link to="/professionals" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <div className="flex justify-between mx-[300px]">
          <Image src={professional.image} alt={professional.name} width={400} />
          <div className="p-[10px]">
            <p className="text-bold text-3xl">{professional.name}</p>
            <p className="mb-2">{professional.location}</p>
            <p className="mb-2">{professional.category_name}</p>
            <p className="text-lime-500">{averageRating}</p>
            <Rate
              allowHalf
              disabled
              value={averageRating}
              className="mb-2"
            />{" "}
            by
            {reviews.length} users
            <div className="bg-gray-200 w-[300px] border-2 mb-2">
              <p>{professional.description}</p>
            </div>
            {IsBooked ? (
              <Button
                type="primary"
                className="bg-red-500 w-[100px] h-[40px]"
                onClick={() => handleCancel(bookId)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-[#403D3A] w-[100px] h-[40px]"
                onClick={handleBookClick}
              >
                Book
              </Button>
            )}
          </div>
        </div>
      )}
      <Review />
      <GetReviews />
      <Footer />
    </div>
  );
}

export default ProfessionalsView;
