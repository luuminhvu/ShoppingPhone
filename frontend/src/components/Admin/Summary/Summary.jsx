import React from "react";
import { FaUsers, FaChartBar, FaClipboard, FaUser } from "react-icons/fa";
import styled from "styled-components";
import Widget from "./Widget";

const Summary = () => {
  const data = [
    {
      icon: <FaUsers />,
      digits: 50,
      isMoney: false,
      title: "Người dùng",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.1)",
      percentage: 30,
    },
    {
      icon: <FaChartBar />,
      digits: 50000000,
      isMoney: true,
      title: "Doanh thu",
      color: "rgb(255,102,102)",
      bgColor: "rgba(255,102,102,0.1)",
      percentage: 60,
    },
    {
      icon: <FaClipboard />,
      digits: 70,
      isMoney: false,
      title: "Đơn hàng",
      color: "rgb(255,178,102)",
      bgColor: "rgba(255,178,102,0.1)",
      percentage: 20,
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
      </MainStats>
    </StyledSummary>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainStats = styled.div`
  flex: 1;
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
