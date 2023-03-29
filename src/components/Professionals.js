import React from "react";
import { Card, Space, Rate, Image } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";

function Professionals({ professional }) {
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
            <p className="text-lime-500">{professional.rating}</p>
            <Rate allowHalf disabled value={professional.rating} />
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
