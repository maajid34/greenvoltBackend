import express from "express";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from "../controllers/contactController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, adminOnly, getContactMessages);
router.put("/:id", protect, adminOnly, updateContactMessage);
router.delete("/:id", protect, adminOnly, deleteContactMessage);

export default router;
