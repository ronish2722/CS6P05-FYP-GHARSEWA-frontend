import React, { useEffect } from "react";
import Message from "../components/Message";
import Professionals from "../components/Professionals";
import Header from "../components/Header";
import { Loading } from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { listProfessionals } from "../actions/professionalAction";
import { Link } from "react-router-dom";
import SearchWorker from "../components/SearchWorker";

const AllProfessionals = () => {
  // const [professionals, setProfessionals] = useState([]);

  const dispatch = useDispatch();
  const professionalList = useSelector((state) => state.professionalList);

  const formData = useSelector((state) => state.form.formData);

  const { error, loading, professionals } = professionalList;

  useEffect(() => {
    dispatch(listProfessionals());
  }, []);
  console.log(professionals);

  return (
    <div className="">
      <Header />

      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
        <div className="">
          <p className="text-black font-black text-3xl  p-[30px] text-center">
            Professionals
          </p>
          {/* <div className="w-1/4 font-black text-xl pl-[50px] pt-[10px] border-r-2">
            Filters
          </div> */}

          <div className="mx-[250px]">
            {professionals
              .filter((professional) => professional.is_approved === true)
              .map((professional) => (
                <div key={professional._id}>
                  <Professionals professional={professional} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProfessionals;
