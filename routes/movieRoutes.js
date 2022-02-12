import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  await Movie.find()
    .then((movies) => res.status(200).json(movies))
    .catch((err) => console.log(err));
});

// Get single movie
router.get("/:id", async (req, res) => {
  await Movie.findById({ _id: req.params.id })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => console.log(err));
});

// Create movies
router.post("/create", async (req, res) => {
  const newMovie = await new Movie({ ...req.body });
  newMovie.save();
  res.status(200).json(newMovie);
});

//Update movies
router.put("/update/:id", async (req, res) => {
  await Movie.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  )
    .then((movies) => res.status(200).json(movies))
    .catch((err) => console.log(err));
});

// Delete movie
router.delete("/delete/:id", async (req, res) => {
  await Movie.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json("Delete is complited"))
    .catch((err) => console.log("Delete unsuccesful"));
});

export default router;
