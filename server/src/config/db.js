
import mongoose from "mongoose";

/**
 * Reusable MongoDB Connection Function.
 * Explicitly connects BuildStack to the buildstack database.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[Database Warning] MONGODB_URI is not defined. MongoDB connection skipped."
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: "buildstack",
    });

    const host = conn.connection.host || "connected";
    const database = conn.connection.name;

    console.log(
      `[Database] MongoDB connected successfully (${host}/${database})`
    );

    return true;
  } catch (error) {
    console.error(
      `[Database Error] MongoDB connection failed: ${error.message}`
    );
    return false;
  }
}

export default connectDB;
