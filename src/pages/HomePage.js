import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePageForm from "../components/HomepageForm";
import Carousel from "../components/Carousel";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";

const onChange = (key) => {
  console.log(key);
};

const HomePage = () => {
  let [notes, setNotes] = useState([]);
  // let { authTokens, logoutUser } = useContext(AuthContext);

  // useEffect(() => {
  //   getNotes();
  // }, []);

  // let getNotes = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/api/notes/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + String(authTokens.access),
  //     },
  //   });
  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setNotes(data);
  //   } else if (response.statusText === "Unauthorized") {
  //     logoutUser();
  //   }
  // };
  return (
    <div>
      {/* <div>
        <p>you are logged in to the homepage!</p>

        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.body}</li>
          ))}
        </ul>
      </div> */}
      <Header />

      <div className="bg-[#F0EFEF]">
        <img
          src={require("../image/fyp4.jpg")}
          alt="home"
          className=" w-screen h-[250px] object-cover"
        />
        <div className="mt-[-100px] flex justify-center">
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
