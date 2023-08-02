import {
  createProducts,
  getProducts,
  getProduct,
} from "../controllers/ProductController.js";
import express from "express";

const router = express.Router();
router.get("/product", getProduct);
router.post("/products", createProducts);

export default router;
