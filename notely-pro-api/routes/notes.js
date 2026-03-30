// ===============================
// Import Express library
// ===============================
const express = require("express");

// ===============================
// Import controller functions
// ===============================
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const validateNote = require("../middleware/validateNote");
// ===============================
// Create router object
// ===============================
const router = express.Router();

// ===============================
// GET all notes
// Route: GET /notes
// ===============================
router.get("/", getAllNotes);

// ===============================
// GET single note by ID
// Route: GET /notes/:id
// ===============================
router.get("/:id", getNoteById);

// ===============================
// POST a new note
// Route: POST /notes
// ===============================
router.post("/", validateNote, createNote);
// ===============================
// PUT update note by ID
// Route: PUT /notes/:id
// ===============================
router.put("/:id", validateNote, updateNote);
// ===============================
// DELETE note by ID
// Route: DELETE /notes/:id
// ===============================
router.delete("/:id", deleteNote);

// ===============================
// Export router
// ===============================
module.exports = router;
