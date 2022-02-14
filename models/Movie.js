import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number },
  price: { type: Number },
  img: { type: String },
  featured: { type: Boolean },
  description: { type: String },
  rate: { type: Number },
  author: { type: String, ref: "User" },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
