import express from "express"; // Sử dụng import thay vì require
import cors from "cors"; // Sử dụng import thay vì require
import mongoose from "mongoose"; // Sử dụng import thay vì require
import ProductRouter from "./routers/ProductRoutes.js"; // Sử dụng import thay vì require
import RegisterRoutes from "./routers/RegisterRoutes.js"; // Sử dụng import thay vì require
import LoginRoutes from "./routers/LoginRoutes.js";
import StripeRoutes from "./routers/StripeRoutes.js";
import dotenv from "dotenv"; // Sử dụng import thay vì require
import path from "path";

const app = express();
// Sử dụng require thay vì import
dotenv.config({ path: path.join(path.resolve(), ".env") });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
}); // Sử dụng RegisterRouter thay vì RegisterRoutes
app.use("/", ProductRouter); // Sử dụng ProductRouter thay vì ProductRoutes
app.use("/login", LoginRoutes);
app.use("/register", RegisterRoutes);
app.use("/stripe", StripeRoutes);
// Sử dụng RegisterRouter thay vì RegisterRoutes
const port = process.env.PORT || 5000; // Sửa lại cổng là 5000, không phải 3001
const URI = process.env.DB_URL; // Sửa lại tên biến là DB_URL, không phải MONGO_URL
// Kết nối với MongoDB
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      port,
      // Sửa lại cổng là 5000, không phải 3001
      console.log(`Server is running on port ${port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
