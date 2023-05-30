import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#403D3A] flex  justify-between p-[50px] text-white pl-[120px]">
      <div className="w-[50%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">GharSewa</h1>
        <p className="w-[80%] text-sm tracking-wider">
          Efficiently manage your household chores with GharSewa, your trusted
          home service partner.{" "}
        </p>
      </div>
      <div className="w-[25%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">Navigation</h1>
        <p className="text-sm">About Us</p>
        <p className="text-sm">Services</p>
        <p className="text-sm">Testimonials</p>
      </div>
      <div className="w-[25%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">Contact</h1>
        <p className="text-sm">abced@gmail.com</p>
        <p className="text-sm">+977 987654321</p>
        <p className="text-sm">Nepal</p>
      </div>
    </div>
  );
};

export default Footer;
