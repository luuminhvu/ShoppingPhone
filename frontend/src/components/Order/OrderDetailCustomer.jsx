import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setHeaders } from "../../store/api";
import styled from "styled-components";

const OrderDetailCustomer = () => {
  const params = useParams();
  const [orderDetailCustomers, setOrderDetailCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        `https://shoppingphone.onrender.com/orders/findorder?userId=${params.id}`,
        setHeaders()
      );
      setOrderDetailCustomers(response.data);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  return (
    <StyledOrderDetail>
      {loading ? (
        <h1>Đang tải...</h1>
      ) : (
        orderDetailCustomers.map((orderDetailCustomer, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h1>Chi tiết đơn hàng</h1>
            <p>
              Trạng thái đơn hàng:{" "}
              {orderDetailCustomer.delivery_status === "pending" ? (
                <span style={{ color: "red" }}>Chưa giao</span>
              ) : orderDetailCustomer.delivery_status === "delivered" ? (
                <span style={{ color: "green" }}>Đã giao</span>
              ) : orderDetailCustomer.delivery_status === "dispatched" ? (
                <span style={{ color: "blue" }}>Đang giao</span>
              ) : (
                <span style={{ color: "orange" }}>Đang xử lý</span>
              )}
            </p>
            <h3>Sản phẩm đã đặt</h3>
            <Items>
              {orderDetailCustomer.products?.map((product, index) => (
                <Item key={index}>
                  <span>Sản phẩm: {product.description}</span>
                  <span>Số lượng: {product.quantity}</span>
                  <span>{product.amount_total.toLocaleString()} VNĐ</span>
                </Item>
              ))}
            </Items>
            <TotalDetail>
              <span>
                Tổng tiền: {orderDetailCustomer.total?.toLocaleString()} VNĐ
              </span>
            </TotalDetail>
            <ShippingDetail>
              <h3>Thông tin giao hàng</h3>
              <p> Tên người nhận: {orderDetailCustomer.shipping?.name}</p>
              <p> Số điện thoại: {orderDetailCustomer.shipping?.phone}</p>
              <p> Địa chỉ email: {orderDetailCustomer.shipping?.email}</p>
            </ShippingDetail>
          </div>
        ))
      )}
    </StyledOrderDetail>
  );
};

const StyledOrderDetail = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
`;

const Items = styled.div`
  margin-top: 20px;
`;

const Item = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 10px;
  }
`;

const TotalDetail = styled.div`
  margin-top: 20px;
  text-align: right;
  font-weight: bold;
`;

const ShippingDetail = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ccc;

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

export default OrderDetailCustomer;
