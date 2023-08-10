import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  previousMonth,
  updateUser,
} from "../controllers/UserController.js";
import { isAdmin, isUser } from "../middlewares/auth.js";
const router = express.Router();
router.get("/find/:id", isUser, getUserById);
router.put("/update/:id", isUser, updateUser);
router.get("/", getUsers);
router.get("/stats", isAdmin, previousMonth);
router.delete("/delete/:id", isAdmin, deleteUser);

export default router;
