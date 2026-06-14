import express from "express";
import {
  createPartner,
  deletePartner,
  getPartnerById,
  getPartners,
  updatePartner,
} from "../controllers/partnerController.js";

const router = express.Router();

router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.post("/", createPartner);
router.put("/:id", updatePartner);
router.delete("/:id", deletePartner);

export default router;
