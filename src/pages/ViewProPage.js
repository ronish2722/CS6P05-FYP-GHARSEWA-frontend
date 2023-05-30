import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import Professionals from "../components/Professionals";
import Sidebar from "../components/Sidebar";
import { Loading } from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { listProfessionals } from "../actions/professionalAction";
import { Link } from "react-router-dom";
import SearchWorker from "../components/SearchWorker";
import { Pagination } from "antd";
import { Select } from "antd";
const { Option } = Select;

const AllProfessionals = () => {
  const dispatch = useDispatch();
  const professionalList = useSelector((state) => state.professionalList);

  const formData = useSelector((state) => state.form.formData);

  const { error, loading, professionals } = professionalList;
  const [selectedCategory, setSelectedCategory] = useState("");
  // Update selected category when component mounts
  useEffect(() => {
    setSelectedCategory(formData.category_name);
  }, [formData.category_name]);
  useEffect(() => {
    dispatch(listProfessionals());
  }, []);
  console.log(professionals);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredProfessionals = professionals.filter(
    (professional) =>
      professional.is_approved === true &&
      (selectedCategory === "" ||
        professional.category_name === selectedCategory)
  );

  const pageSize = 2;
  const [current, setCurrent] = useState(1);
  const totalItems = filteredProfessionals.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const onPageChange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  const currentProfessionals = filteredProfessionals.slice(
    startIndex,
    endIndex + 1
  );

  return (
    <div className="bg-neutral-300 relative min-h-screen">
      <Sidebar />
      <img
        src={require("../image/01.jpg")}
        alt="home"
        className=" w-screen h-[300px] object-cover"
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <div className="">
          <div className="w-[880px] py-6 ml-[400px] bg-neutral-100 rounded-lg shadow-md p-6 mx-[100px] relative mt-[-40px] font-bold text-xl">
            Professionals
          </div>
          <div className="flex justify-center mb-4 mt-[20px] ml-[300px]">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={handleCategoryChange}
              value={selectedCategory || formData.category_name}
            >
              <Option value="">All Categories</Option>
              {Array.from(
                new Set(professionals.map((p) => p.category_name))
              ).map((category) => (
                <Option value={category} key={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>
          <div className=" ml-[380px]">
            {currentProfessionals.map((professional) => (
              <div key={professional._id}>
                <Professionals professional={professional} />
              </div>
            ))}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  current={current}
                  total={totalItems}
                  pageSize={pageSize}
                  onChange={onPageChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProfessionals;
