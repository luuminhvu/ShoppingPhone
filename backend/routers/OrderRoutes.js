import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  UserCreatedCount,
  getOrder,
  getRevenue,
  getRevenueWeek,
  updateOrder,
} from "../controllers/OrderController.js";
const router = express.Router();
router.put("/:id", isAdmin, updateOrder);
router.get("/stats", isAdmin, UserCreatedCount);
router.get("/revenue/stats", isAdmin, getRevenue);
router.get("/week-sales", getRevenueWeek);
router.get("/", getOrder);
export default router;
