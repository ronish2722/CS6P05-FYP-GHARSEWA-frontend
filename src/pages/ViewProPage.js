import React, { useEffect } from "react";
import Message from "../components/Message";
import Professionals from "../components/Professionals";
import Header from "../components/Header";
import { Loading } from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { listProfessionals } from "../actions/professionalAction";
import { Link } from "react-router-dom";

const ViewProPage = () => {
  // const [professionals, setProfessionals] = useState([]);

  const dispatch = useDispatch();
  const professionalList = useSelector((state) => state.professionalList);

  const { error, loading, professionals } = professionalList;

  useEffect(() => {
    // async function fetchProfessionals() {
    //   const { data } = await axios.get("/api/professionals/");
    //   setProfessionals(data);
    // }

    // fetchProfessionals();

    dispatch(listProfessionals());
  }, []);
  return (
    <div>
      <Header />
      <h1 className="font-black text-3xl pl-[50px] pt-[10px]">Professionals</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message message={error} type="error" />
      ) : (
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
      )}
    </div>
  );
};

export default ViewProPage;
