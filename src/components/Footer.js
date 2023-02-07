import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#403D3A] flex  justify-between p-[50px] text-white">
      <div className="w-[50%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">GharSewa</h1>
        <p className="w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
      <div className="w-[25%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">Navigation</h1>
        <p>About Us</p>
        <p>Services</p>
        <p>Testimonials</p>
      </div>
      <div className="w-[25%] space-y-[10px]">
        <h1 className="font-bold text-[20px]">Contact</h1>
        <p>abced@gmail.com</p>
        <p>+977 987654321</p>
        <p>Nepal</p>
      </div>
    </div>
  );
};

export default Footer;
