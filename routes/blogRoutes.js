import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogByIdOrSlug,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:identifier", getBlogByIdOrSlug);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
