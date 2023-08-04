import express from "express";
import { previousMonth } from "../controllers/UserController.js";
import { isAdmin } from "../middlewares/auth.js";
const router = express.Router();
router.get("/stats", isAdmin, previousMonth);
export default router;
