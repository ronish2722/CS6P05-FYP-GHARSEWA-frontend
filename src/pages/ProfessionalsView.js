import React, { useState, useEffect } from "react";
import professionals from "../professionals";
import { Link } from "react-router-dom";
import { Image, Rate, Button } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfessionalsView() {
  const { id } = useParams();
  console.log(id);
  // const professional = professionals.find((p) => p.__id == id);

  const [professional, setProfessional] = useState([]);

  useEffect(() => {
    async function fetchProfessional() {
      const { data } = await axios.get(`/api/professionals/${id}`);
      setProfessional(data);
    }

    if (id) {
      fetchProfessional();
    }
  }, [id]);
  return (
    <div>
      <Header />
      <Link to="/viewpro" className="btn btn-light my-3">
        Go back
      </Link>
      <div className="flex justify-between mx-[300px]">
        <Image src={professional.image} alt={professional.name} width={400} />
        <div>
          <p className="text-black text-3xl">{professional.name}</p>
          <p>{professional.location}</p>
          <p>{professional.category}</p>
          <p className="text-lime-500">{professional.rating}</p>
          <Rate allowHalf disabled value={professional.rating} />
          <div className="bg-gray-200 w-[300px] border-2">
            <p>{professional.description}</p>
          </div>
          <Button type="primary" className="bg-[#403D3A] w-[100px] h-[40px]">
            Book
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfessionalsView;
