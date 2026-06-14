import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  getTestimonials,
  updateTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
