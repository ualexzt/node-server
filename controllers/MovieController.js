import Movie from "../models/Movie.js";

const getMovies = async (req, res) => {
  try {
    await Movie.find()
      .then((movies) => res.status(200).json(movies))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const getMovie = async (req, res) => {
  try {
    await Movie.findById({ _id: req.params.id })
      .then((movie) => res.status(200).json(movie))
      .catch((err) => console.log(err));
  } catch (error) {}
};

const createMovie = async (req, res) => {
  try {
    const newMovie = await new Movie({ ...req.body });
    newMovie.save();
    return res.status(200).json(newMovie);
  } catch (error) {
    console.log(error);
  }
};

const updateMovie = async (req, res) => {
  try {
    await Movie.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
      .then((movies) => res.status(200).json(movies))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log();
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete({ _id: req.params.id })
      .then(() => res.status(200).json("Delete is complited"))
      .catch((err) => console.log("Delete unsuccesful"));
  } catch (error) {
    console.log(error);
  }
};

export { getMovie, getMovies, createMovie, updateMovie, deleteMovie };
