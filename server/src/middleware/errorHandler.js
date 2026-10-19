/**
 * Centralized Express Error Handling Middleware.
 * Ensures error details, stack traces, and internal secrets are not leaked to clients.
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  const isProduction = process.env.NODE_ENV === "production";

  // Log error internally on the server
  console.error(`[Server Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
