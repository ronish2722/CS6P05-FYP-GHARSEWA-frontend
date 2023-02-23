import React, { useState, useEffect } from "react";
import professionals from "../professionals";
import Professionals from "../components/Professionals";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProPage = () => {
  const [professionals, setProfessionals] = useState([]);
  // console.log(professionals[0]._id);

  useEffect(() => {
    async function fetchProfessionals() {
      const { data } = await axios.get("/api/professionals/");
      setProfessionals(data);
    }

    fetchProfessionals();
  }, []);
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
            <div key={professional._id}>
              <Professionals professional={professional} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProPage;
