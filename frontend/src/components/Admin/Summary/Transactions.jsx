import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders } from "../../../store/api";
import styled from "styled-components";
import moment from "moment";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://shoppingphone.onrender.com/orders/?new=true",
          setHeaders()
        );
        setTransactions(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <StyledTransactions>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Giao dịch mới nhất</h3>
          {transactions.map((transaction, index) => (
            <Transaction key={index}>
              <p>{transaction.shipping.name}</p>
              <p>{transaction.total.toLocaleString()}</p>
              <p>{moment(transaction.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransactions>
  );
};
const StyledTransactions = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0, 87);
  padding: 1rem;
  border-radius: 10px;
  h3 {
    color: white;
  }
`;
const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  border-radius: 3px;
  padding: 0.5rem;
  background: rgba(38, 198, 249, 0.12);
  justify-content: space-between;
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
export default Transactions;
