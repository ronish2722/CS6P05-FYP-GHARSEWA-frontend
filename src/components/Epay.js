import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Epay() {
  const [amount, setAmount] = useState("");

  const [searchParams] = useSearchParams();

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleEpay = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/epay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoFromStorage.token}`,
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.data) {
        window.location.replace(data.data.payment_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length != 0) {
      console.log(params);
    }
  }, []);

  return (
    <form onSubmit={handleEpay}>
      <button type="submit">Pay with Khalti</button>
    </form>
  );
}

export default Epay;
