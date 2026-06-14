import Partner from "../models/Partner.js";

export const createPartner = async (req, res) => {
  const partner = await Partner.create(req.body);
  res.status(201).json(partner);
};

export const getPartners = async (req, res) => {
  const filter = req.query.all === "true" ? {} : { status: "published" };
  const partners = await Partner.find(filter).sort({ order: 1, createdAt: -1 });

  res.json(partners);
};

export const getPartnerById = async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ message: "Not found" });
  res.json(partner);
};

export const updatePartner = async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!partner) return res.status(404).json({ message: "Not found" });
  res.json(partner);
};

export const deletePartner = async (req, res) => {
  const partner = await Partner.findByIdAndDelete(req.params.id);
  if (!partner) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Partner deleted" });
};
