import { checkout, webhook } from "../controllers/StripeController.js";
import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/create-checkout-session", checkout);
router.post("/webhook", express.json({ type: "application/json" }), webhook);
export default router;
