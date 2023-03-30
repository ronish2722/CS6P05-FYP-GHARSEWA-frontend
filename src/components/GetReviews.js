import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";

const GetReviews = () => {
  const [reviews, setReviews] = useState([]);
  const professionalDetail = useSelector((state) => state.professionalDetail);
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
    <div>
      <h2>Reviews:</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.user}</p>
          <Rate allowHalf disabled value={review.rating} />

          <p>Comment: {review.comment}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default GetReviews;
