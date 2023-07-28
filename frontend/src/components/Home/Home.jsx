import React from "react";
import { useGetAllProductsQuery } from "../../store/productApi";
import "./Home.css";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>New Arrival</h2>
          <div className="products">
            {data.map((product) => (
              <div className="product" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <span className="product_desc">{product.desc}</span>
                  <span className="product_price">{product.price} VNĐ</span>
                </div>
                <button className="add-to-cart">Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
