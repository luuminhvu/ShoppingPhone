import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setHeaders } from "../../../store/api";
import axios from "axios";
import styled from "styled-components";

const OrderDetail = () => {
  const params = useParams();
  const [order, setOrder] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://shoppingphone.onrender.com/orders/find/${params.id}`,
          setHeaders()
        );
        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [params.id]);
  return (
    <StyledOrderDetail>
      {loading ? (
        <h1>Đang tải...</h1>
      ) : (
        <>
          <h1>Chi tiết đơn hàng</h1>
          <p>
            Trạng thái đơn hàng:{" "}
            {order.delivery_status === "pending" ? (
              <span style={{ color: "red" }}>Chưa giao</span>
            ) : order.delivery_status === "delivered" ? (
              <span style={{ color: "green" }}>Đã giao</span>
            ) : order.delivery_status === "dispatched" ? (
              <span style={{ color: "blue" }}>Đang giao</span>
            ) : (
              <span style={{ color: "orange" }}>Đang xử lý</span>
            )}
          </p>
          <h3>Sản phẩm đã đặt</h3>
          <Items>
            {order.products?.map((product, index) => (
              <Item key={index}>
                <span>Sản phẩm: {product.description}</span>
                <span>Số lượng: {product.quantity}</span>
                <span>{product.amount_total.toLocaleString()} VNĐ</span>
              </Item>
            ))}
          </Items>
          <TotalDetail>
            <span>Tổng tiền: {order.total?.toLocaleString()} VNĐ</span>
          </TotalDetail>
          <ShippingDetail>
            <h3>Thông tin giao hàng</h3>
            <p> Tên người nhận: {order.shipping?.name}</p>
            <p> Số điện thoại: {order.shipping?.phone}</p>
            <p> Địa chỉ email: {order.shipping?.email}</p>
          </ShippingDetail>
        </>
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

export default OrderDetail;
