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

const permissionModules = [
  "dashboard",
  "projects",
  "categories",
  "publications",
  "blogs",
  "partners",
  "testimonials",
  "messages",
  "users",
];

/* GENERATE TOKEN */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const normalizePermissions = (role = "user", permissions = {}) => {
  const isAdmin = role === "admin";

  return permissionModules.reduce((result, moduleKey) => {
    const selected = permissions?.[moduleKey] || {};
    const edit = isAdmin || Boolean(selected.edit);
    const view = isAdmin || edit || moduleKey === "dashboard" || Boolean(selected.view);

    result[moduleKey] = { view, edit };
    return result;
  }, {});
};

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  permissions: normalizePermissions(user.role, user.permissions),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/* ================= REGISTER (ADMIN ONLY) ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, permissions } = req.body;
    const selectedRole = role === "admin" ? "admin" : "user";

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: selectedRole,
      permissions: normalizePermissions(selectedRole, permissions),
    });

    res.status(201).json({
      ...formatUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= USERS MANAGEMENT ================= */
export const getUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users.map(formatUser));
};

export const updateUser = async (req, res) => {
  const { name, email, role, password, permissions } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (role && user.role === "admin" && role !== "admin") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res.status(400).json({ message: "At least one admin is required" });
    }
  }

  const selectedRole = role === "admin" ? "admin" : role === "user" ? "user" : user.role;

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.role = selectedRole;
  user.permissions = normalizePermissions(selectedRole, permissions ?? user.permissions);

  if (password) {
    user.password = password;
  }

  const updated = await user.save();

  res.json({
    ...formatUser(updated),
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role === "admin") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res.status(400).json({ message: "At least one admin is required" });
    }
  }

  await user.deleteOne();
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
      ...formatUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
