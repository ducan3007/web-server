import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cloudinary from "cloudinary";
import path from "path";
import "dotenv/config";

import router from "./routes/routes.js";
const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(morgan("dev"));

app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/api", router);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    throw error;
  }
  console.log("MongoDb connected!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
