import mongoose from "mongoose";
import "dotenv/config";

export const connect = async () => {
  try {

    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/fintrack`
    );

    console.log(`DB HOST: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MONGO DB CONNECTION ERROR: ${error}`);
  }
};

