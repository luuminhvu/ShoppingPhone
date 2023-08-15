import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const [totalQuantityNew, setTotalQuantityNew] = useState(0);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  useEffect(() => {
    setTotalQuantityNew(totalQuantity);
  }, [totalQuantity]);
  //khi có sự thay đổi và totalQuantity thì nó sẽ tự động cập nhật lại
  // const [totalQuantity, setTotalQuantity] = useState(0);
  // useEffect(() => {
  //   // Tính tổng số lượng khi cartItems thay đổi
  //   const newTotalQuantity = cartItems.reduce(
  //     (acc, item) => acc + item.cartQuantity,
  //     0
  //   );

  //   // Cập nhật state totalQuantity bằng giá trị mới
  //   setTotalQuantity(newTotalQuantity);
  // }, [cartItems]);
  // const totalQuantity = cartItems.reduce(
  //   (acc, item) => acc + item.cartQuantity,
  //   0
  // );
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Shopping Phone</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <div className="nav-bag_logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </svg>
          </div>
          <span className="nav-bag__quantity">{totalQuantityNew}</span>
        </div>
      </Link>
      {auth._id ? (
        <div className="nav-bar__logged">
          {auth.isAdmin ? (
            <Link className="nav-bar__admin" to="/admin/summary">
              Admin
            </Link>
          ) : (
            <Link className="nav-bar__user" to={`/users/${auth._id}`}>
              {auth.name}
            </Link>
          )}

          <Link className="nav-bar__order" to={`/users/${auth._id}/orders`}>
            Đơn hàng
          </Link>
          <Link
            className="nav-bar__logout"
            onClick={() => {
              dispatch(logout());
              toast.success("Đăng xuất thành công");
            }}
          >
            Đăng xuất
          </Link>
        </div>
      ) : (
        <div className="nav-bar__auth">
          <Link to="/login">Đăng nhập</Link>
          <Link to="/register">Đăng ký</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
