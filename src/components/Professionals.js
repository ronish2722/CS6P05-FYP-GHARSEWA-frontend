import React, { useEffect } from "react";
import { Card, Space, Rate, Image, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { listAllReviews } from "../actions/reviewsAction";
import { EnvironmentOutlined } from "@ant-design/icons";

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
      <Card className=" bg-neutral-100 my-3 p-3 rounded-[10px] mx-[20px] w-full h-[200px] max-w-[880px]">
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
            <div className="flex">
              <EnvironmentOutlined className="pt-[5px] pr-[5px]" />
              <p>{professional.location}</p>
            </div>
            <p>{professional.category_name}</p>
          </div>
          <div>
            <Rate allowHalf disabled value={averageRating} /> by{" "}
            {professionalReviews.length} users
            <div className="w-[300px] text-inherit">
              <p>
                {professional.description.split(" ").slice(0, 20).join(" ")}...
              </p>
            </div>
            <Link to={`/professionals/${professional._id}`}>
              <Button className="ml-[180px] mt-[20px] bg-[#403D3A] text-white">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Professionals;
