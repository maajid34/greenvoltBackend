import Publication from "../models/publicationModel.js";

/* CREATE */
export const createPublication = async (req, res) => {
  const { title, description, category } = req.body;

  if (!req.fileData) {
    return res.status(400).json({ message: "File is required" });
  }

  const pub = await Publication.create({
    title,
    description,
    category,
    ...req.fileData,
  });

  res.status(201).json(pub);
};

/* READ ALL */
export const getPublications = async (_req, res) => {
  const pubs = await Publication.find().sort({ createdAt: -1 });
  res.json(pubs);
};

/* READ ONE */
export const getPublicationById = async (req, res) => {
  const pub = await Publication.findById(req.params.id);
  if (!pub) return res.status(404).json({ message: "Not found" });
  res.json(pub);
};

/* UPDATE */
export const updatePublication = async (req, res) => {
  const update = { ...req.body };

  if (req.fileData) {
    Object.assign(update, req.fileData);
  }

  const pub = await Publication.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  );

  if (!pub) return res.status(404).json({ message: "Not found" });
  res.json(pub);
};

/* DELETE */
export const deletePublication = async (req, res) => {
  const pub = await Publication.findByIdAndDelete(req.params.id);
  if (!pub) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Publication deleted" });
};
