import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../controllers/MovieController.js";
const router = express.Router();

// Get all movies
router.get("/", getMovies);

// Get single movie
router.get("/:id", getMovie);

// Create movies
router.post("/create", createMovie);

//Update movies
router.put("/update/:id", updateMovie);

// Delete movie
router.delete("/delete/:id", deleteMovie);

export default router;
