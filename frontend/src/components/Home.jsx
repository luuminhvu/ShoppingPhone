import React from "react";
import { useGetAllProductsQuery } from "../store/productApi";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return <div>Home</div>;
};

export default Home;
