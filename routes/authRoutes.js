import express from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser); // optional
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
