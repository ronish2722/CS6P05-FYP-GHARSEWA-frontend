import React from "react";

export const AboutUs = () => {
  return (
    <div>
      <div className="bg-[#F0EFEF] flex justify-center px-[150px] py-[50px]">
        <div className="">
          <h1 className="font-[1000] text-7xl w-[450px] mb-[40px]">
            We make Home Care easier
          </h1>
          <p className="w-[400px] pt-[20px] text-sm tracking-wider leading-7">
            Efficiently manage your household chores with GharSewa, your trusted
            home service partner.
          </p>
        </div>
        <div className=" bg-[#333231] w-[100px] h-[100px] rounded-full absolute" />
        <div className=" bg-[#333231] w-[200px] h-[200px] rounded-full absolute ml-[300px]" />
        <div className=" bg-[#333231] w-[50px] h-[50px] rounded-full absolute" />
        <div className=" bg-[#333231] w-[100px] h-[100px] rounded-full absolute" />
        <img
          src={require("../image/home.jpeg")}
          alt="home"
          width={250}
          className="pt-[200px] pr-[50px] ml-[100px]"
        />
        <img
          src={require("../image/home3.jpeg")}
          alt="home"
          width={280}
          className="h-[400px]"
        />
      </div>
    </div>
  );
};

export default AboutUs;
