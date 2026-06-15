// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import projectRoutes from "./routes/projectRoutess.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import authRoutes from "./routes/authRoutes.js";
// import publicationRoutes from "./routes/publicationRoute.js"

// dotenv.config();

// const app = express();

// /* MIDDLEWARE */
// app.use(cors());
// app.use(express.json());

// /* ROUTES */
// app.use("/api/projects", projectRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/publications", publicationRoutes);



// /* ERROR HANDLERS */
// app.use(notFound);
// app.use(errorHandler);


// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //       "http://127.0.0.1:5173",
// //       "https://aayareebfrontend.vercel.app"
// //     ],
// //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );




// /* DB + SERVER */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on port ${process.env.PORT}`)
//     );
//   })
//   .catch((err) => console.error(err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import publicationRoutes from "./routes/publicationRoute.js";
import blogRoutes from "./routes/blogRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ================= MIDDLEWARE ================= */
// app.use(cors());


/* ================= ROOT ROUTE (MUHIIM) ================= */


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://greenvolt-energy.com",
      "https://www.greenvolt-energy.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
// 
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "GreenVolt API is running 🚀",
  });
});

/* ================= API ROUTES ================= */
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

/* ================= ERROR HANDLERS ================= */
app.use(notFound);
app.use(errorHandler);

/* ================= DB + SERVER ================= */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
