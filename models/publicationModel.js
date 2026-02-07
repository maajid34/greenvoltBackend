import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, trim: true }, // report, policy, guideline

    fileUrl: { type: String, required: true },   // public R2 URL
    storageKey: { type: String, required: true }, // R2 object key

    mimetype: String,
    size: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Publication", publicationSchema);
