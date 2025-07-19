import mongoose from "mongoose";
import { MONGO_URI } from "../constant.js";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
