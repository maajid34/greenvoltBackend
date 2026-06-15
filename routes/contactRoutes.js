import express from "express";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from "../controllers/contactController.js";
import { hasPermission, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, hasPermission("messages"), getContactMessages);
router.put("/:id", protect, hasPermission("messages", "edit"), updateContactMessage);
router.delete("/:id", protect, hasPermission("messages", "edit"), deleteContactMessage);

export default router;
