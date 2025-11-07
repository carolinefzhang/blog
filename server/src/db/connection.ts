import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

// Connect immediately when module loads
(async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db("articles");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  } finally {
    // Optionally close the connection if you don't want to keep it open
    // await client.close();
  }
})();

// Export a getter function that returns the db instance
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Connection may still be in progress.");
  }
  return db;
};

// Helper function to get a collection directly
export const getCollection = (name: string) => {
  return getDB().collection(name);
};

export default getDB;