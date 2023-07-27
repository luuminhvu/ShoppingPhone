import { getProducts } from "../controllers/ProductController.js";
import express from "express";

const router = express.Router();
router.get("/product", getProducts);

export default router;
