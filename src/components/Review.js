import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProfessionalsDetails } from "../actions/professionalAction";
import { Space, Rate, Card, Button, Input } from "antd";

const Review = () => {
  const { TextArea } = Input;
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(listProfessionalsDetails(id));
  }, [dispatch]);

  const handleRatingChange = (value) => {
    setRating(value);
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

      <div className="px-[100px]">
        <div>
          <p>Rating</p>
          <Rate
            value={rating}
            onChange={handleRatingChange}
            allowClear={false}
          />
        </div>

        <div className="py-[20px]">
          <label>
            Comment:
            <TextArea rows={2} value={comment} onChange={handleCommentChange} />
          </label>
        </div>

        <button
          className=" px-[50px] py-[10px] rounded-[10px] bg-slate-700 text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Review;
