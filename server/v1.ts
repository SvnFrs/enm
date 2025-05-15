
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri);

const dbName = "enm";

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("users");

    // Example: List databases
    const databases = await client.db().admin().listDatabases();
    console.log("Databases:", databases.databases);

    // Example: Insert a document
    const user = { name: "John Doe", age: 30 };
    const result = await collection.insertOne(user);
    console.log(`Inserted document with _id: ${result.insertedId}`);

    // Example: Find a document
    const foundUser = await collection.findOne({ name: "John Doe" });
    console.log("Found user:", foundUser);
  } finally {
    await client.close();
  }
}

run().catch(console.error).finally(() => client.close())
