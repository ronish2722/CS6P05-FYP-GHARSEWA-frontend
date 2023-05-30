import React from "react";

const Services = () => {
  return (
    <div className="pb-[100px]">
      <div className="text-6xl font-[1000]  text-center p-[50px]">
        Our Service
      </div>
      <div className="flex justify-between px-[100px]">
        <div className="bg-[#D9D9D9] w-3/12 rounded-xl  p-[30px]">
          <img
            src={require("../image/pro.png")}
            alt="home"
            className="w-[70px] ml-[80px] mb-[15px]"
          />
          <h1 className="text-lg font-bold text-center mb-[15px]">
            Skilled Professional
          </h1>
          <div className="text-center text-sm tracking-wider">
            Skilled professionals at GharSewa are experienced in managing
            household chores with precision and care
          </div>
        </div>
        <div className="bg-[#D9D9D9] w-3/12 rounded-xl p-[30px]">
          <img
            src={require("../image/services.png")}
            alt="home"
            className="w-[70px] ml-[80px] mb-[15px]"
          />
          <h1 className="text-lg font-bold text-center mb-[15px]">
            Scheduled Planning
          </h1>
          <div className="text-center text-sm tracking-wider">
            Effortlessly plan and schedule your household chores with GharSewa's
            convenient and user-friendly platform
          </div>
        </div>
        <div className="bg-[#D9D9D9] w-3/12 rounded-xl  p-[30px]">
          <img
            src={require("../image/opportunity.png")}
            alt="home"
            className="w-[70px] ml-[80px] mb-[15px]"
          />
          <h1 className="text-lg font-bold text-center mb-[15px]">
            Opportunities
          </h1>
          <div className="text-center text-sm tracking-wider">
            Discover new opportunities for managing your household chores with
            GharSewa's innovative and comprehensive services
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
