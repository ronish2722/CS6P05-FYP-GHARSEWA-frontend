import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Khalti = () => {
  return (
    <div className="bg-neutral-200 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md flex flex-col items-center">
        <img
          src={require("../image/khalti.png")}
          alt="cash"
          className="w-32 mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-700 text-center mb-8">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>
        <Link to="/your-booking">
          <button className="bg-primary-500  py-2 px-4 rounded-md hover:bg-primary-600">
            Back to Bookings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Khalti;
