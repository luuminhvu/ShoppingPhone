import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate("/admin/products/create-product")}
      >
        Thêm sản phẩm
      </button>
      <Outlet />
    </>
  );
};

export default Products;
