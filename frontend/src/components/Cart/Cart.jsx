import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <div className="cart-empty__link">
            <Link to="/">
              <span>Tiếp tục mua sắm nào</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-table">
          <div className="cart-titles">
            <h3 className="cart-table__title">Sản Phẩm</h3>
            <h3 className="cart-table__price">Giá</h3>
            <h3 className="cart-table__quantity">Số lượng</h3>
            <h3 className="cart-table__total">Tổng</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__product">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item__product-info">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button>Xoá</button>
                  </div>
                </div>
                <div className="cart-item__price">
                  <p>{item.price}</p>
                </div>
                <div className="cart-item__quantity">
                  <button>-</button>
                  <input type="text" value={item.cartQuantity} />
                  <button>+</button>
                </div>
                <div className="cart-item__total">
                  <p>{item.price * item.cartQuantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="cart-clear">Xoá tất cả</button>
            <div className="cart-checkout">
              <div className="cart-checkout__total">
                <span>Tổng tiền</span>
                <span className="cart-checkout__total-price">
                  {cart.cartTotalAmount}
                </span>
              </div>
              <p>Đã bao gồm VAT (nếu có)</p>
              <button>Thanh toán</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <div className="cart-continue__shopping">
                    <span>Tiếp tục mua sắm nào</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
