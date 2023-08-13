import React from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history("/cart");
  };
  return (
    <div className="home-container">
      {status === "pending" ? (
        <p>Loading</p>
      ) : status === "rejected" ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>Sản phẩm mới</h2>
          <div className="products">
            {data.map((product) => (
              <div className="product" key={product._id}>
                <h3>{product.name}</h3>
                <img
                  onClick={() => {
                    history(`/product/${product._id}`);
                  }}
                  src={product.image.url}
                  alt={product.name}
                />
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
