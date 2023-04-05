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
  // const [reviews, setReviews] = useState([]);
  // const [averageRating, setAverageRating] = useState(0);

  const dispatch = useDispatch();
  const professionalDetail = useSelector((state) => state.professionalDetail);
  const { error, loading, professional } = professionalDetail;
  const { id } = useParams();
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews, averageRating } = reviewsState;

  useEffect(() => {
    dispatch(listProfessionalsDetails(id));
    dispatch(listReviews(id));
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/api/review/${id}/`
  //       );
  //       setReviews(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  // useEffect(() => {
  //   const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  //   const average = sum / reviews.length || 0;
  //   setAverageRating(average.toFixed(1));
  // }, [reviews]);

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
      // Redirect to a success page or show a success message
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
            by&nbsp;
            {reviews.length} users
            <div className="bg-gray-200 w-[300px] border-2 mb-2">
              <p>{professional.description}</p>
            </div>
            <Button
              type="primary"
              className="bg-[#403D3A] w-[100px] h-[40px]"
              onClick={handleBookClick}
            >
              Book
            </Button>
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
