import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("the database connection is established");
  } catch (error) {
    console.log(error);
  }
};