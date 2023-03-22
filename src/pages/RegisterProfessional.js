import React, { useState } from "react";
import axios from "axios";

const RegisterProfessional = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", image);
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
    } catch (err) {
      setError(err.response.data.detail);
    }
  };
  return (
    <div className="flex justify-between">
      <img
        src={require("../image/fyp2.jpeg")}
        alt="login"
        className="w-[854px] h-screen"
      />
      <div className="p-7 w-full my-auto space-y-[100px]">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center">
            Welcome to GharSewa
          </p>

          {/* <form onSubmit={(e) => loginUser(e)}> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-[20px] space-y-[20px]">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
                // placeholder="Enter username"

                className="border-b-2 h-[40px]"
              />
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border-b-2 h-[40px]"
              />
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
    </div>
  );
};

export default RegisterProfessional;
