import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProfessionalsDetails } from "../actions/professionalAction";
import { Space, Rate, Card, Button, Input, Modal } from "antd";

const Review = () => {
  const { TextArea } = Input;
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
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
    } catch (error) {
      setError(error.response.data.detail); // handle error
    }
  };

  return (
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
  );
};

export default Review;
