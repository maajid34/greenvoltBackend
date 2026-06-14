// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// /* GENERATE TOKEN */
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// /* ================= REGISTER (OPTIONAL) ================= */
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const user = await User.create({ name, email, password });

//   res.status(201).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     token: generateToken(user._id),
//   });
// };

// /* ================= LOGIN ================= */
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const isMatch = await user.matchPassword(password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     token: generateToken(user._id),
//   });
// };


import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* GENERATE TOKEN */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ================= REGISTER (ADMIN ONLY) ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= USERS MANAGEMENT ================= */
export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const updateUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.role = role ?? user.role;

  if (password) {
    user.password = password;
  }

  const updated = await user.save();

  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
