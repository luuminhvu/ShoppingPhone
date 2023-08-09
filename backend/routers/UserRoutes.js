import express from "express";
import {
  deleteUser,
  getUsers,
  previousMonth,
} from "../controllers/UserController.js";
import { isAdmin } from "../middlewares/auth.js";
const router = express.Router();
router.get("/", isAdmin, getUsers);
router.get("/stats", isAdmin, previousMonth);
router.delete("/delete/:id", isAdmin, deleteUser);

export default router;
