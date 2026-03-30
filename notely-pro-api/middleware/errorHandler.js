// ===============================
// Global Error Handling Middleware
// ===============================
const errorHandler = (err, req, res, next) => {
  // Log full error in terminal
  console.error(err.stack);

  // Use provided status code or default to 500
  const statusCode = err.statusCode || 500;

  // Use provided message or default message
  const message = err.message || "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
