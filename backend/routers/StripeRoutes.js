import { checkout } from "../controllers/StripeController.js";
import express from "express";
const router = express.Router();

router.post("/create-checkout-session", checkout);

export default router;
