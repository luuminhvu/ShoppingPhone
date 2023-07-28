import React from "react";
import { useGetAllProductsQuery } from "../../store/productApi";
import "./Home.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleAddToCart = (product) => {
    console.log(product);
    dispatch(addToCart(product));
    history("/cart");
  };
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
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  className="add-to-cart"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
