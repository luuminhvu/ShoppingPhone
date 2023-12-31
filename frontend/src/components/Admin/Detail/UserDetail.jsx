import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setHeaders } from "../../../store/api";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserDetail = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const [loading, setLoading] = useState(false); // [2
  const [updating, setUpdating] = useState(false); // [3
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: "",
    password: "",
  }); // [1
  useEffect(() => {
    if (!auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);
  useEffect(() => {
    setLoading(true); // [4
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://shoppingphone.onrender.com/users/find/${params.id}`,
          setHeaders()
        );

        setUser({
          ...res.data,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setLoading(false); // [5
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // [6
    try {
      await axios.put(
        `https://shoppingphone.onrender.com/users/update/${params.id}`,
        user,
        setHeaders()
      );
      setUser({
        ...user,
        password: "",
      });
      toast.success("Update user successfully");
      setUpdating(false); // [7
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledUserDetail>
      <UserDetailContainer>
        {loading ? (
          <p>Loading</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Cập nhật thông tin cá nhân</h3>
            {user.isAdmin ? <Admin>Quản trị</Admin> : <User>Khách hàng</User>}
            <label htmlFor="name">Họ tên</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Mật khẩu</label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit">
              {updating ? "Đang cập nhật" : "Cập nhật"}
            </button>
          </form>
        )}
      </UserDetailContainer>
    </StyledUserDetail>
  );
};
const StyledUserDetail = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;
const UserDetailContainer = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-top: 10px;
    }
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 5px;
    }
    button {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;
const Admin = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #ddd;
  color: #333;
`;
const User = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #ddd;
  color: #333;
`;

export default UserDetail;
