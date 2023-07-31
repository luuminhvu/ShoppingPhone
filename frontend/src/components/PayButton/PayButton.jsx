import axios from "axios";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const handleCheckout = () => {
    axios
      .post("http://localhost:5000/stripe/create-checkout-session", {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <button className="pay-button" onClick={handleCheckout}>
      Thanh Toán
    </button>
  );
};

export default PayButton;
