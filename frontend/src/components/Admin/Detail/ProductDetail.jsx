import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(products);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:5000/product/find/${params.id}`
      );
      setProducts(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleAddToCart = (products) => {
    dispatch(addToCart(products));
    navigate("/cart");
  };
  return (
    <div>
      <StyledProduct>
        <ProductContainer>
          {loading ? (
            <p>Loading</p>
          ) : (
            <>
              <ProductImgContainer>
                <img src={products.image?.url} alt="" />
              </ProductImgContainer>
              <ProductInfoContainer>
                <h3>{products.name}</h3>
                <p>
                  <span>Thương hiệu: </span> {products.brand}
                </p>
                <p>
                  <span>Mô tả: </span> {products.desc}
                </p>
                <Price>Giá : {products.price?.toLocaleString()} VNĐ</Price>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    handleAddToCart(products);
                  }}
                >
                  Add to Cart
                </button>
              </ProductInfoContainer>
            </>
          )}
        </ProductContainer>
      </StyledProduct>
    </div>
  );
};
const StyledProduct = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  margin-top: 2rem;
`;
const ProductContainer = styled.div`
  width: 80%;
  min-height: 80vh;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  @media (max-width: 1300px) {
    flex-direction: column;
    padding: 2rem 2rem;
  }
`;
const ProductImgContainer = styled.div`
  width: 40%;
  height: 60vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1300px) {
    width: 100%;
    height: 40vh;
  }
`;
const ProductInfoContainer = styled.div`
  width: 40%;

  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    span {
      font-weight: 600;
    }
  }
  .add-to-cart-btn {
    padding: 1rem 2rem;
    background: #3f51b5;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #303f9f;
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
  }
`;
const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export default ProductDetail;
