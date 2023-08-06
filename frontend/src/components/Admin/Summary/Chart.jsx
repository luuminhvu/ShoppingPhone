import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders } from "../../../store/api";
const Chart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const compare = (a, b) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/orders/week-sales",
          setHeaders()
        );
        res.data.sort(compare);
        const newData = res.data.map((item) => {
          const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return {
            day: DAYS[item._id - 1],
            amount: item.total,
          };
        });
        setSales(newData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <StyledChart>
        {loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
            className="loading-chart"
          >
            Loading...
          </div>
        )}
        {!loading && (
          <>
            <h3>Doanh thu 7 ngày gần nhất</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={sales}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </StyledChart>
    </>
  );
};
const StyledChart = styled.div`
  width: 100%;
  height: 330px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.5);
  border-radius: 10px;
  max-width: 700px;
  h3 {
    font-size: 14px;
    text-align: center;
  }
`;
export default Chart;
