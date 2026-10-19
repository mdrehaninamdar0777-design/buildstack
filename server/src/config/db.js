import mongoose from "mongoose";

/**
 * Reusable MongoDB Connection Function using Mongoose.
 * Sanitizes logging to prevent exposing credentials.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[Database Warning] MONGODB_URI is not defined in environment variables. MongoDB connection skipped."
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);

    // Sanitize host for secure logging (does not print credentials or full connection string)
    const host = conn.connection.host || "connected";
    console.log(`[Database] MongoDB connected successfully (${host})`);
    return true;
  } catch (error) {
    console.error(`[Database Error] MongoDB connection failed: ${error.message}`);
    return false;
  }
}

export default connectDB;
