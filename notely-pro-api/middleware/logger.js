// ===============================
// Request Logging Middleware
// ===============================
const logger = (req, res, next) => {
  // Get current time
  const currentTime = new Date().toISOString();

  // Log request method and URL
  console.log(`[${currentTime}] ${req.method} ${req.url}`);

  // Move to next middleware/controller
  next();
};

module.exports = logger;
