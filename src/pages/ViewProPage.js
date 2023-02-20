import React from "react";
import professionals from "../professionals";
import Professionals from "../components/Professionals";
import Header from "../components/Header";

const ViewProPage = () => {
  return (
    <div>
      <Header />
      <h1 className="font-black text-3xl pl-[50px] pt-[10px]">Professionals</h1>
      <div className="flex ">
        <div className="w-1/4 font-black text-xl pl-[50px] pt-[10px] border-r-2">
          Filters
        </div>
        <div className="mx-[50px]">
          {professionals.map((professional) => (
            <div key={professional.__id}>
              <Professionals professional={professional} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProPage;
