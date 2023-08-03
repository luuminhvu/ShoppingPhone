import {
  createProducts,
  getProducts,
  getProduct,
} from "../controllers/ProductController.js";

import express from "express";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/product", getProduct);
router.post("/products", isAdmin, createProducts);

export default router;
