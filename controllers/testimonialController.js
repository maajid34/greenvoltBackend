import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
};

export const getTestimonials = async (req, res) => {
  const filter = req.query.all === "true" ? {} : { status: "published" };
  const testimonials = await Testimonial.find(filter).sort({
    order: 1,
    createdAt: -1,
  });

  res.json(testimonials);
};

export const getTestimonialById = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return res.status(404).json({ message: "Not found" });
  res.json(testimonial);
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) return res.status(404).json({ message: "Not found" });
  res.json(testimonial);
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Testimonial deleted" });
};
