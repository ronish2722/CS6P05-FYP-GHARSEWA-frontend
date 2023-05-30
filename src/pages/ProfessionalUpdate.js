import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Card from "antd/es/card/Card";
import { Image } from "antd";
import { Link } from "react-router-dom";

const ProfessionalUpdate = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessionalData();
  }, []);

  const fetchProfessionalData = async () => {
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-professionals/",
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      const professionalData = response.data;
      setName(professionalData.name);
      setLocation(professionalData.location);
      setNumber(professionalData.number);
      setPrice(professionalData.price);
      setDescription(professionalData.description);
      setCategory(professionalData.category);
      console.log(response.data);
      // Set the image value if available
      if (professionalData.image) {
        setImage(professionalData.image);
      }
    } catch (err) {
      setError(err.response.data.detail);
      console.log(err.response.data.detail);
      // Handle error
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("number", number);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    const token = localStorage.getItem("token");
    try {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      const response = await axios.put(
        "/api/professionals/update-professional/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setSuccess(true);
      console.log(response.data);
      // Handle successful update
    } catch (err) {
      setError(err.response.data.detail);
      console.log(err.response.data.detail);
      // Handle error
    }
  };
  return (
    <div>
      <div className="bg-neutral-300 min-h-screen">
        <Sidebar />
        <img
          src={require("../image/01.jpg")}
          alt="home"
          className=" w-screen h-[300px] object-cover"
        />
        <div className="py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
          Update Professional Page
        </div>

        <Card className="mt-[20px] ml-[400px] max-w-[880px] ml-[300px] bg-neutral-100">
          <form onSubmit={handleSubmit}>
            <div className="flex p-[20px] justify-between">
              <div>
                <Image width={300} src={image} alt={name} />
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="flex flex-col p-[20px] space-y-[20px] w-[400px]">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b-2 h-[40px]"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-b-2 h-[40px]"
                />

                <input
                  type="text"
                  placeholder="Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="border-b-2 h-[40px]"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-b-2 h-[40px]"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-b-2 h-[40px]"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border-b-2 h-[40px]"
                />
                <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
                  Update
                </button>
              </div>
            </div>
            <Link to="/profile">
              <p className="ml-[315px] text-neutral-600">
                <u>Check Professional Profile</u>
              </p>
            </Link>
          </form>
        </Card>
      </div>

      {success && <p>Professional page updated successfully.</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ProfessionalUpdate;
