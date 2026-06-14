import express from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", protect, adminOnly, registerUser);
router.get("/users", protect, adminOnly, getUsers);
router.put("/users/:id", protect, adminOnly, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;
