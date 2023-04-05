import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import Professionals from "../components/Professionals";
import Header from "../components/Header";
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
    <div className="">
      <Header />
      <img
        src={require("../image/13.jpg")}
        alt="todo"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          filter: "blur(2px)",
          zIndex: -1,
        }}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <div className="">
          <p className="text-black font-black text-3xl  p-[30px] text-center">
            Professionals
          </p>
          <div className="flex justify-center mb-4">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={handleCategoryChange}
              value={selectedCategory}
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
          <div className="mx-[250px]">
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
