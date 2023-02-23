import React, { useState, useEffect } from "react";
import professionals from "../professionals";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Rate, Button } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { listProfessionalsDetails } from "../actions/professionalAction";
import { Loading } from "../components/Loading";
import Message from "../components/Message";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfessionalsView() {
  const dispatch = useDispatch();
  const professionalDetail = useSelector((state) => state.professionalDetail);
  const { error, loading, professional } = professionalDetail;
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProfessionalsDetails(id));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Link to="/viewpro" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
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
      )}

      <Footer />
    </div>
  );
}

export default ProfessionalsView;
