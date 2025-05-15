import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "";
const dbName = process.env.DB_NAME || "enm";

const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export const getDB = () => {
  return client.db(dbName);
};

export const closeDB = async () => {
  await client.close();
  console.log("MongoDB connection closed");
};
