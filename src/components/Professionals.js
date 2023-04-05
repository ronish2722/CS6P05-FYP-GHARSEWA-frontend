import React, { useEffect } from "react";
import { Card, Space, Rate, Image, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { listAllReviews } from "../actions/reviewsAction";
import { DownOutlined } from "@ant-design/icons";

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
      <Card className="my-3 p-3 rounded-[20px] mx-[20px] w-full h-[200px]">
        <div className="flex justify-between">
          <div className="">
            <Link to={`/professionals/${professional._id}`}>
              <Image
                width={100}
                src={professional.image}
                alt={professional.name}
              />
            </Link>
          </div>
          <div className="mx-[30px]">
            <Link to={`/professionals/${professional._id}`}>
              <p className="text-bold text-xl">{professional.name}</p>
            </Link>
            <p>{professional.location}</p>
            <p>{professional.category_name}</p>
          </div>
          <div>
            <Rate allowHalf disabled value={averageRating} /> by{" "}
            {professionalReviews.length} users
            <div className="w-[300px] text-inherit">
              <p>{professional.description}</p>
            </div>
            <Button className="flex justify-end">View Details</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Professionals;
