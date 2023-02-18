import React from "react";
import { Card, Space } from "antd";
import Header from "./Header";

function Professionals({ professional }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded mx-[50px]">
        <a
          href={`/professionals/${professional._id}`}
          className="flex justify-between"
        >
          {/* <Card.Img src={professional.image} /> */}
          <img
            alt="example"
            src={require("../image/hari.jpg")}
            className="w-1/6"
          />
          <div>
            <p className="font-black text-xl">{professional.name}</p>

            <p>{professional.location}</p>
            <p>{professional.category}</p>
            <p className="text-lime-500">{professional.rating}</p>
            <div className="bg-gray-200 w-[300px] border-2">
              <p>{professional.description}</p>
            </div>
          </div>
        </a>
      </Card>
    </div>
  );
}

export default Professionals;
