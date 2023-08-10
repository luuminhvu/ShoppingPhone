import React from "react";
import styled from "styled-components";

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SuccessMessage = styled.div`
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SuccessIcon = styled.span`
  font-size: 48px;
`;

const CheckoutSuccess = () => {
  return (
    <SuccessContainer>
      <SuccessMessage>
        <SuccessIcon>✔️</SuccessIcon>
        <h2>Payment Successful!</h2>
        <p>Your payment has been successfully processed.</p>
      </SuccessMessage>
    </SuccessContainer>
  );
};

export default CheckoutSuccess;
