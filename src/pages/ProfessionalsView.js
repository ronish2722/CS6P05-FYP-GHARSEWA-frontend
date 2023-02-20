import React from "react";
import professionals from "../professionals";
import { useParams, Link } from "react-router-dom";
import { Image } from "antd";

function ProfessionalsView({ match }) {
  const { id } = useParams();
  const professional = professionals.find((p) => p.__id === id);
  return (
    <div>
      <Link to="/viewpro" className="btn btn-light my-3">
        Go back
      </Link>
      <div>
        <Image src={professional.image} alt={professional.name} />
      </div>
    </div>
  );
}

export default ProfessionalsView;
