// ===============================
// Validation Middleware for Notes
// ===============================
const validateNote = (req, res, next) => {
  // Extract content from request body
  const { content } = req.body;

  // Validate content
  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  // Continue to next middleware/controller
  next();
};

module.exports = validateNote;
