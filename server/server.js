import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { initializeFirebaseAdmin } from "./src/config/firebaseAdmin.js";

const PORT = process.env.PORT || 5000;

// Initialize services and start server
async function startServer() {
  console.log("==========================================");
  console.log("  Starting BuildStack Express Server...   ");
  console.log("==========================================");

  // Initialize Firebase Admin SDK (if credentials provided)
  initializeFirebaseAdmin();

  // Connect to MongoDB (if URI provided)
  await connectDB();

  // Start HTTP Listener
  const server = app.listen(PORT, () => {
    console.log(`[Server] BuildStack API running on port ${PORT}`);
    console.log(`[Server] Health endpoint: http://localhost:${PORT}/api/health`);
  });

  // Graceful Shutdown handling
  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      console.log("[Server] HTTP server closed.");
      try {
        const mongoose = (await import("mongoose")).default;
        if (mongoose.connection.readyState !== 0) {
          await mongoose.connection.close();
          console.log("[Database] MongoDB connection closed.");
        }
      } catch (err) {
        console.error("[Database] Error closing MongoDB connection:", err.message);
      }
      process.exit(0);
    });

    // Force exit if shutdown hangs
    setTimeout(() => {
      console.error("[Server] Forceful shutdown initiated after timeout.");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  // Handle uncaught exceptions and unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("[Unhandled Rejection]:", err.message || err);
  });

  process.on("uncaughtException", (err) => {
    console.error("[Uncaught Exception]:", err.message || err);
  });
}

startServer();
