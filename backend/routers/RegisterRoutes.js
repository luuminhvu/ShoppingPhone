import { registerUser } from "../controllers/RegisterController.js";
import express from "express";

const router = express.Router();
router.post("/", registerUser);
export default router;
