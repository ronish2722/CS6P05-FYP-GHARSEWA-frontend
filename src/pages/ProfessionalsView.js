import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Image,
  Rate,
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Input,
  Form,
} from "antd";
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

function ProfessionalsView({}) {
  const { TextArea } = Input;
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [mainreviews, setMainReviews] = useState([]);

  const [IsBooked, setIsBooked] = useState(false);
  const [bookId, setBookId] = useState(null); // Define bookId in the state
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState("");
  const [bookedDate, setBookedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);
  // const [startTime, setStartTime] = useState("");

  const handleStartTimeChange = (timeString) => {
    const selectedTime = new Date(`01/01/2000 ${timeString}`);
    const startTime = new Date(`01/01/2000 06:00 AM`);
    const endTime = new Date(`01/01/2000 06:00 PM`);

    if (selectedTime >= startTime && selectedTime <= endTime) {
      setStartTime(timeString);
    } else {
      // Display an error message or take appropriate action
      console.log("Selected time is not within the allowed range.");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

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
  // console.log(IsBooked);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    const checkBookingStatus = async () => {
      if (userInfoFromStorage) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/view-book/${id}`,
            {
              headers: {
                Authorization: `Bearer ${userInfoFromStorage.token}`,
              },
            }
          );

          if (response.data) {
            setIsBooked(true);
            setBookings(response.data);
          } else {
            setIsBooked(false);
          }
        } catch (error) {
          setIsBooked(false);
        }
      }
    };

    checkBookingStatus();
  }, []);

  // console.log(bookings);

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
  }, [bookId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/review/${id}/`
        );
        setMainReviews(response.data);
        setSubmittedReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  const handleBookClick = async (values) => {
    try {
      console.log("Locations:", locations);
      console.log("Booked Date:", bookedDate);
      console.log("Start Time:", startTime);
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      if (!locations) {
        message.error("Location is required.");
        return;
      }

      if (!bookedDate) {
        message.error("Date is required.");
        return;
      }

      if (!startTime) {
        message.error("Time is required.");
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/book-professional/${id}/`,
        {
          locations: locations,
          booked_date: bookedDate,
          start_time: startTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      const { book_id } = response.data;

      message.success(`Booking confirmed with ID: ${book_id}`);

      setIsBooked(true);
      setBookId(book_id); // Set bookId in the state
      console.log(book_id);
      // Redirect to a success page or show a success message
    } catch (error) {
      message.error(error.response.data.error);
    }
    console.log(error);
  };

  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  const handleCancel = async () => {
    const bookID = bookings[0]._id;
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cancel-booking/${bookID}/`,
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      message.success(`Booking cancelled successfully`);
      setIsBooked(false);
      // Reset bookId in the state
    } catch (error) {
      message.error(error.message);
    }
  };
  console.log(bookedDate);
  console.log(startTime);
  const disabledDate = (current) => {
    const currentDate = new Date();
    return current && current <= currentDate;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create-review/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );

      console.log(response.data); // handle success

      // Reset the comment and rating state variables
      setComment("");
      setRating("");

      await fetchReviews();
    } catch (error) {
      message.error(error.response.data.detail); // handle error
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/review/${id}/`
      );
      setMainReviews(response.data);
      setSubmittedReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-neutral-100 max-w-screen">
      <Header />
      {/* <Link to="/professionals" className="btn btn-light my-3">
        Go back
      </Link> */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <div className="mt-[20px] flex justify-between mx-auto max-w-4xl px-4 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center w-1/2">
            <Image
              src={professional.image}
              alt={professional.name}
              width={400}
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 ml-8">
            <div>
              <p className="text-4xl font-bold text-gray-800">
                {professional.name}
              </p>
              <p className="mt-4 text-gray-600">
                <b>Location: </b>
                {professional.location}
              </p>
              <p className="mt-4 text-gray-600">
                <b>Category:</b> {professional.category_name}
              </p>
              <p className="mt-4 text-gray-600">
                <b>Number:</b> {professional.number}
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <p className="text-2xl font-bold text-lime-500">
                {averageRating}
              </p>
              <Rate allowHalf disabled value={averageRating} className="ml-2" />
              <p className="ml-2 text-gray-600">by {reviews.length} users</p>
            </div>
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <p className="text-gray-700">{professional.description}</p>
            </div>
            <div className="text-bold text-lg ml-[300px] mt-[20px]">
              Rs. {professional.price}/Hr
            </div>
            <div className="mt-6 flex justify-center">
              {IsBooked ? (
                <Button
                  type="primary"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                  onClick={() => handleCancel(bookId)}
                >
                  Cancel Booking
                </Button>
              ) : (
                <div className="flex-col">
                  <Form.Item
                    name="locations"
                    value={locations}
                    required
                    onChange={(e) => setLocations(e.target.value)}
                  >
                    <Input placeholder="Location" />
                  </Form.Item>
                  <div className="flex justify-center ">
                    <Form.Item
                      name="booked_date"
                      value={bookedDate}
                      required
                      className="mr-[20px]"
                    >
                      <DatePicker
                        disabledDate={disabledDate}
                        // onChange={(e) => setBookedDate(e.target.value)}
                        onChange={(date, dateString) =>
                          setBookedDate(dateString)
                        }
                      />
                    </Form.Item>
                    <Form.Item required name="start_time" value={startTime}>
                      <TimePicker
                        format="HH:mm"
                        required
                        onChange={(time, timeString) =>
                          setStartTime(timeString)
                        }
                      />
                    </Form.Item>
                  </div>

                  <Button
                    type="primary"
                    className="bg-[#403D3A] hover:bg-[#4A4845] text-white font-bold  rounded px-[120px]"
                    onClick={handleBookClick}
                  >
                    Book Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <h2 className="font-bold text-2xl mb-6 mx-[100px]">Reviews:</h2>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-[#403D3A] my-[15px] mx-[100px]"
      >
        Add Review
      </Button>
      <Modal
        title="Review"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancelModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}

          <div className="px-[100px]">
            <div>
              <p>Rating</p>
              <Rate
                value={rating}
                onChange={handleRatingChange}
                allowClear={false}
                tooltips={["1", "2", "3", "4", "5"]}
              />
            </div>

            <div className="py-[20px]">
              <label>
                Comment:
                <TextArea
                  rows={2}
                  value={comment}
                  onChange={handleCommentChange}
                />
              </label>
            </div>

            <button
              className=" px-[50px] py-[10px] rounded-[10px] bg-slate-700 text-white ml-[60px]"
              type="submit"
              onClick={handleOk}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <div className="px-[100px]">
        {/* <h2 className="font-bold text-2xl mb-6">Reviews:</h2> */}
        {submittedReviews.map((review) => (
          <div key={review._id} className="py-4 border-b-2">
            <p className="font-bold text-lg mb-2">{review.user}</p>
            <div className="flex items-center mb-2">
              <Rate allowHalf disabled value={review.rating} className="mr-2" />
              <span className="text-gray-500 text-sm">{review.date}</span>
            </div>
            <p
              className="text-gray-600
          "
            >
              {review.comment}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProfessionalsView;
