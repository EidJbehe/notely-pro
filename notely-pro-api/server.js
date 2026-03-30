// ===============================
// Import Express library
// ===============================
const express = require("express");
const cors = require("cors");
// ===============================
// Import notes routes
// ===============================
const notesRoutes = require("./routes/notes");

// ===============================
// Import logger middleware
// ===============================
const logger = require("./middleware/logger");

// ===============================
// Import not found middleware
// ===============================
const notFound = require("./middleware/notFound");

// ===============================
// Import error handler middleware
// ===============================
const errorHandler = require("./middleware/errorHandler");

// ===============================
// Create Express app
// ===============================
const app = express();

// ===============================
// Define server port
// ===============================
const PORT = process.env.PORT || 3000;
// ===============================
// Middleware to parse JSON requests
// ===============================
app.use(express.json());
app.use(cors());
app.use(express.json());
// ===============================
// Middleware to log all requests
// ===============================
app.use(logger);

// ===============================
// Test route
// ===============================
app.get("/", (req, res) => {
  res.send("Notely Pro API is running...");
});

// ===============================
// Use notes routes
// All note endpoints will start with /notes
// ===============================
app.use("/notes", notesRoutes);

// ===============================
// Handle unknown routes
// ===============================
app.use(notFound);

// ===============================
// Use error handler middleware
// ===============================
app.use(errorHandler);

// ===============================
// Start the server
// ===============================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
