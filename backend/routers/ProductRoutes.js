import {
  createProducts,
  getProducts,
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/ProductController.js";

import express from "express";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/product/find/:id", getProductById);
router.put("/product/edit/:id", isAdmin, updateProduct);
router.get("/product", getProduct);
router.post("/products", isAdmin, createProducts);
router.delete("/product/delete/:id", isAdmin, deleteProduct);

export default router;
