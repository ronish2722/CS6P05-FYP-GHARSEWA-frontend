import React, { useState, useEffect } from "react";
import { Card, Space, Rate, Image } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";

function Professionals({ professional }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const { id } = useParams();

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

  useEffect(() => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length || 0;
    setAverageRating(average.toFixed(1));
  }, [reviews]);

  return (
    <div>
      <Card className="my-3 p-3 rounded mx-[20px] w-full">
        <div className="flex">
          <div className="">
            <Link to={`/professionals/${professional._id}`}>
              <Image
                width={200}
                src={professional.image}
                alt={professional.name}
              />
              {/* <Card.Img src={professional.image} /> */}
              {/* <img
            alt="example"
            src={require("../image/hari.jpg")}
            className="w-1/6"
          /> */}
            </Link>
          </div>
          <div className="mx-[30px]">
            <Link to={`/professionals/${professional._id}`}>
              <p className="font-black text-xl">{professional.name}</p>
            </Link>
            <p>{professional.location}</p>
            <p>{professional.category_name}</p>
            <p className="text-lime-500">{averageRating}</p>
            <Rate allowHalf disabled value={averageRating} /> by&nbsp;
            {reviews.length} users
            <div className="bg-gray-200 w-[300px] border-2">
              <p>{professional.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Professionals;
