import React, { useEffect, useState } from "react";
import { FaUsers, FaChartBar, FaClipboard, FaUser } from "react-icons/fa";
import styled from "styled-components";
import Widget from "./Widget";
import axios from "axios";
import { setHeaders } from "../../../store/api";
import Chart from "./Chart";
import Transactions from "./Transactions";

const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [revenuePerc, setRevenuePerc] = useState([]);
  const compare = (a, b) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/users/stats",
          setHeaders()
        );
        res.data.sort(compare);
        setUsers(res.data);
        setUsersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/orders/stats",
          setHeaders()
        );
        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/orders/revenue/stats",
          setHeaders()
        );
        res.data.sort(compare);
        setRevenue(res.data);
        setRevenuePerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Người dùng",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.1)",
      percentage: usersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: revenue[0]?.total,
      isMoney: true,
      title: "Doanh thu",
      color: "rgb(255,102,102)",
      bgColor: "rgba(255,102,102,0.1)",
      percentage: revenuePerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Đơn hàng",
      color: "rgb(255,178,102)",
      bgColor: "rgba(255,178,102,0.1)",
      percentage: ordersPerc,
    },
  ];
  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Tổng quan</h2>
            <p>Thống kê tổng quan về hệ thống</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats>
        <Transactions />
      </SideStats>
    </StyledSummary>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainStats = styled.div`
  flex: 2;
`;
const SideStats = styled.div`
  flex: 2;
  margin-left: 1rem;
  height: 100%;
  width: 100%;
`;

const Overview = styled.div`
  background-color: rgb(48, 51, 78);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 700px;
`;

const Title = styled.div`
  h2 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const WidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Summary;
