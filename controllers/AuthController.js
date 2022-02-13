import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { validationResult } from "express-validator";
import tokenService from "../service/tokenService.js";

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

    const tokens = tokenService.generateAccessToken({
      id: user._id,
      roles: user.roles,
    });
    await tokenService.tokenSave(user._id, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
    });
    return res.json({ ...tokens });
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
      throw new Error("User with this email exists");
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USER" });
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      roles: userRole,
    });
    const tokens = tokenService.generateAccessToken({
      id: user._id,
      roles: user.roles,
    });
    console.log(user._id, tokens.refreshToken);
    await tokenService.tokenSave(user._id, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
    });

    return res.status(200).json({ ...tokens });
  } catch (error) {
    console.log(error);
    // return res.status(400).json({ message: "Registaration error", error });
  }
};
// Log out
const logout = async (req, res, next) => {
  try {
  } catch (error) {}
};

const refresh = async (req, res, next) => {
  try {
  } catch (error) {}
};

export { login, signup, logout, refresh };
