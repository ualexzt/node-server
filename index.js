import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongo from "./config/db.js";
import MovieRouters from "./routes/movieRoutes.js";
import AuthRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Api routers
app.use("/api/auth", AuthRouter);
app.use("/api/movie", MovieRouters);

// Connect backend server
connectMongo()
  .then(() =>
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
