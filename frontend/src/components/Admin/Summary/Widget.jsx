import React from "react";
import styled from "styled-components";

const Widget = ({ data }) => {
  return (
    <StyleWidget>
      <Icon color={data.color} bgColor={data.bgColor}>
        {data.icon}
      </Icon>
      <Text>
        <h3>
          {data.isMoney
            ? data.digits?.toLocaleString() + " VNĐ"
            : data.digits?.toLocaleString()}
        </h3>
        <p>{data.title}</p>
      </Text>
      {data.percentage < 0 ? (
        <>
          <Percentage isPositive={false}>
            {Math.floor(data.percentage)}%
          </Percentage>
        </>
      ) : (
        <>
          <Percentage isPositive={true}>
            {Math.floor(data.percentage)}%
          </Percentage>
        </>
      )}
    </StyleWidget>
  );
};

const StyleWidget = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  border-radius: 3px;
  font-size: 20px;
  margin-right: 10px;
`;

const Text = styled.div`
  h3 {
    font-weight: 900;
    margin-bottom: 5px;
    color: white;
  }
  p {
    font-size: 14px;
    color: white;
    margin: 0;
  }
`;
const Percentage = styled.div`
  color: ${(props) => (props.isPositive ? "green" : "red")};
  font-size: 14px;
  margin-left: 10px;
  font-weight: 900;
`;

export default Widget;
