import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_ACCESS, () => console.log("DB Connected!"))
    .catch(() => console.error("Something went wrong with DB"));
};

app.listen(8800, () => {
  connect();
  console.log("Connected to server!");
});
