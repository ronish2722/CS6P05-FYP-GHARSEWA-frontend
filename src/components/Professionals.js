import React, { useEffect } from "react";
import { Card, Space, Rate, Image } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { listAllReviews } from "../actions/reviewsAction";

function Professionals({ professional }) {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviewListAll);

  useEffect(() => {
    dispatch(listAllReviews());
  }, [dispatch]);

  const professionalReviews = reviews.filter(
    (review) => review.professional === professional._id
  );
  const sum = professionalReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = sum / professionalReviews.length || 0;

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
            </Link>
          </div>
          <div className="mx-[30px]">
            <Link to={`/professionals/${professional._id}`}>
              <p className="font-black text-xl">{professional.name}</p>
            </Link>
            <p>{professional.location}</p>
            <p>{professional.category_name}</p>
            <p className="text-lime-500">{averageRating}</p>
            <Rate allowHalf disabled value={averageRating} /> by{" "}
            {professionalReviews.length} users
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
