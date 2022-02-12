import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoUrl = process.env.MONGOOSE_URL;

const connectMongo = async () => {
  await mongoose.connect(mongoUrl);
};

export default connectMongo;
