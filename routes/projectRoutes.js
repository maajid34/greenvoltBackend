// import express from "express";
// import {
//   createProject,
//   getProjects,
//   getSingleProject,
//   getProjectsByCategory,
//   getProjectById,
// } from "../controllers/projectController.js";

// import { upload } from "../middleware/uploadR2.js";

// const router = express.Router();

// router.post("/", upload.single("image"), createProject);

// router.get("/", getProjects);
// router.get("/category/:categoryId", getProjectsByCategory);
// router.get("/:slug", getSingleProject);
// router.get("/:id", getProjectById);


// export default router;


import express from "express";
import {
  createProject,
  getProjects,
  getSingleProjectBySlug,
  getProjectsByCategory,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/PController.js";

import { upload } from "../middleware/uploadR2.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE */
// router.post("/", upload.single("image"), createProject);
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "photos", maxCount: 20 },
  ]),
  createProject
);



/* READ */
router.get("/", getProjects);
router.get("/category/:categoryId", getProjectsByCategory);

/* IMPORTANT: ORDER & PATH */
router.get("/id/:id", getProjectById);          // ✅ ID
router.get("/slug/:slug", getSingleProjectBySlug); // ✅ SLUG

/* UPDATE */
// router.put("/:id",
//   // protect,adminOnly, 
//   upload.single("image"), updateProject);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "photos", maxCount: 20 },
  ]),
  updateProject
);
/* DELETE */
router.delete("/:id",
  // protect,adminOnly, 
  deleteProject);

export default router;
