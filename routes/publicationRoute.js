import express from "express";
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../controllers/publictionContrl.js";

import { uploadDoc, uploadToR2 } from "../middleware/uploadDoc.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPublications);
router.get("/:id", getPublicationById);

router.post(
  "/",
  
  uploadDoc,
  uploadToR2,
  createPublication
);

router.put(
  "/:id",
  protect,
  adminOnly,
  uploadDoc,
  uploadToR2,
  updatePublication
);

router.delete("/:id", protect, adminOnly, deletePublication);

export default router;
