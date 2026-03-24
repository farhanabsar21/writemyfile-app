import mongoose from "mongoose";
import { env } from "../config/env";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
