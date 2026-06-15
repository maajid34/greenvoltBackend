import ContactMessage from "../models/ContactMessage.js";

export const createContactMessage = async (req, res) => {
  const { fullName, email, phone, service, companyName, message } = req.body;

  if (!fullName || !email || !phone || !service || !message) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const contactMessage = await ContactMessage.create({
    fullName,
    email,
    phone,
    service,
    companyName,
    message,
  });

  res.status(201).json({
    message: "Message sent successfully",
    data: contactMessage,
  });
};

export const getContactMessages = async (_req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const updateContactMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json(message);
};

export const deleteContactMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json({ message: "Contact message deleted" });
};
