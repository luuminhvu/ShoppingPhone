import express from "express"; // Sử dụng import thay vì require
import cors from "cors"; // Sử dụng import thay vì require
import ProductRouter from "./routers/ProductRoutes.js"; // Sử dụng import thay vì require
const app = express(); // Sử dụng require thay vì import

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/", ProductRouter); // Sử dụng ProductRouter thay vì ProductRoutes
const port = process.env.PORT || 5000; // Sửa lại cổng là 5000, không phải 3001
app.listen(
  port,
  // Sửa lại cổng là 5000, không phải 3001
  console.log(`Server is running on port ${port}`)
);
