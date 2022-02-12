import mongoose from "mongoose";

const roleSchems = new mongoose.Schema({
  value: { type: String, require: true, default: "USER" },
});

const Role = mongoose.model("Role", roleSchems);
export default Role;
