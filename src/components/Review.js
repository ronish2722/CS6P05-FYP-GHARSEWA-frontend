import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProfessionalsDetails } from "../actions/professionalAction";

const Review = () => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(listProfessionalsDetails(id));
  }, [dispatch]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
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
    } catch (error) {
      setError(error.response.data.detail); // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <label>
        Rating:
        <input type="number" value={rating} onChange={handleRatingChange} />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={handleCommentChange} />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default Review;
