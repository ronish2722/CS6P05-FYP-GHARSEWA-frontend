import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";

const GetReviews = () => {
  const [reviews, setReviews] = useState([]);
  // const professionalDetail = useSelector((state) => state.professionalDetail);
  const { id } = useParams();
  console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/review/${id}/`
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="px-[100px]">
      {/* <h2 className="font-bold text-2xl mb-6">Reviews:</h2> */}
      {reviews.map((review) => (
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
  );
};

export default GetReviews;
