import express from "express";
import { check } from "express-validator";
import {
  login,
  logout,
  refresh,
  signup,
} from "../controllers/AuthController.js";

const router = express.Router();

// Auth login
router.post("/login", login);

// Auth sign up
router.post(
  "/signup",
  [
    check("username", "Username is not be empty").notEmpty(),
    check("email", "Email mast be email").isEmail(),
    check("password", "Password cannot be less than 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);

// Auth logout
router.post("/logout", logout);

// Refresh Token
router.get("/refresh", refresh);

// Get user
router.get("/user", async (req, res) => {});

export default router;
