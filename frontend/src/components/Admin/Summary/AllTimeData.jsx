import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);
  console.log(items);
  return (
    <StyledAllTimeData>
      <h3>Toàn bộ thời gian</h3>
      <Info>
        <Title>Người dùng</Title>
        <Data>200</Data>
      </Info>
      <Info>
        <Title>Sản phẩm</Title>
        <Data>{items?.length}</Data>
      </Info>
      <Info>
        <Title>Doanh thu</Title>
        <Data>200.000.000</Data>
      </Info>
      <Info>
        <Title>Đơn hàng</Title>
        <Data>200</Data>
      </Info>
    </StyledAllTimeData>
  );
};
const StyledAllTimeData = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0, 87);
  padding: 1rem;
  border-radius: 10px;
  h3 {
    color: white;
  }
  margin-top: 1rem;
`;
const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
const Title = styled.div`
  flex: 1;
`;
const Data = styled.div`
  flex: 1;
  font-weight: bold;
`;
export default AllTimeData;
