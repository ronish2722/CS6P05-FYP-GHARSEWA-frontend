import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePageForm from "../components/HomepageForm";
import Carousel from "../components/Carousel";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";


const HomePage = () => {
  let [notes, setNotes] = useState([]);
 
  return (
    <div>
      
      <Header />

      <div className="bg-[#F0EFEF]">
        <img
          src={require("../image/01.jpg")}
          alt="home"
          className=" w-screen h-[400px] object-cover"
        />
        <div className="mt-[-150px] flex justify-center pb-[50px]">
          <HomePageForm />
        </div>
      </div>
      <AboutUs />
      <Services />
      {/* <Carousel /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
