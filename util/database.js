import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONOGDB_URI);

    isConnected = true;
    
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("MongoDb connection error :", error);
  }
};
