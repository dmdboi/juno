import mongoose from "mongoose";

export async function connectMongo() {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined in .env file");
  }

  mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("[ DB ] MongoDB Connected"));
}
