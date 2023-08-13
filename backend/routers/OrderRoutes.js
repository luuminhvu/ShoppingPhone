import express from "express";
import { auth, isAdmin, isUser } from "../middlewares/auth.js";
import {
  UserCreatedCount,
  getOrder,
  getOrderById,
  getOrderByIdCustomer,
  getRevenue,
  getRevenueWeek,
  updateOrder,
} from "../controllers/OrderController.js";
const router = express.Router();
router.get("/findorder", auth, getOrderByIdCustomer);
router.get("/find/:id", auth, getOrderById);
router.put("/:id", isAdmin, updateOrder);
router.get("/stats", isAdmin, UserCreatedCount);
router.get("/revenue/stats", isAdmin, getRevenue);
router.get("/week-sales", getRevenueWeek);
router.get("/", getOrder);
export default router;
