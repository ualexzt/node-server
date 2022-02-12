import mongoose from "mongoose";

const userSchems = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

const User = mongoose.model("User", userSchems);
export default User;
