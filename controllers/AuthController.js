import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { validationResult } from "express-validator";

// Generate JWT token
const generateAccessToken = (id, roles) => {
  const secret = process.env.PRIVATE_KEY;
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not faund" });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Password not correct" });
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

// SignUp
const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Registartion error", errors });
    }
    const { username, email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "Registaration error" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USER" });
    const user = new User({
      username,
      email,
      password: hashPassword,
      roles: userRole,
    });
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "Registaration error", error });
  }
};

export { login, signup };
