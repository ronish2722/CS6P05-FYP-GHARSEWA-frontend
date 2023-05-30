import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterProfessional = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categories/");
      setCategories(data);
      setSelectedCategory(data[0]?.name || "");
    };
    fetchCategories();
  }, []);

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
    formData.append("category", selectedCategory);
    formData.append("image", image[0]);
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    try {
      const response = await axios.post(
        "/api/register-professionals/",
        formData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );
      setSuccess(true);
      message.success("Your registration request has been sent");
      navigate("/");
    } catch (err) {
      setError(err.response.data.detail);
      message.error(err.response.data.detail);
      // message.error("Your registeration is already being processed.");
      // message.error("Please wait for admins approval.");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="p-7 w-full my-auto s">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center text-sm">
            Welcome to GharSewa
          </p>

          {/* <form onSubmit={(e) => loginUser(e)}> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-[20px] space-y-[20px] text-sm">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
                // placeholder="Enter username"

                className="border-b-2 h-[20px]"
              />
              <div className="py-[10px]">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="border-b-2 h-[40px] mr-[50px]"
                />
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border-b-2 h-[40px]"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="py-[10px]">
                <label htmlFor="number">Number:</label>
                <input
                  type="number"
                  id="number"
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className="border-b-2 h-[40px] mr-[50px]"
                />
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="border-b-2 h-[40px] mr-[10px]"
                />
              </div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border-b-2 h-[40px]"
              />
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

              <button className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <img
        src={require("../image/02.jpg")}
        alt="login"
        className="w-[2000px] h-screen"
      />
    </div>
  );
};

export default RegisterProfessional;
