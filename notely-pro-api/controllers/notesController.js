// ===============================
// Import notes data
// ===============================
const notes = require("../data/notes");
// ===============================
// GET /notes
// Get all notes with search, sort, and pagination
// ===============================
const getAllNotes = (req, res) => {
  // Extract query parameters
  const { search, sort, page = 1, limit = 10 } = req.query;

  // Create a copy of notes array
  let result = [...notes];

  // Filter notes by content if search exists
  if (search) {
    result = result.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort notes by createdAt
  if (sort === "asc") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "desc") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Convert page and limit to numbers
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  // Calculate pagination values
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  // Paginate result
  const paginatedNotes = result.slice(startIndex, endIndex);

  // Return response
  res.json({
    success: true,
    total: result.length,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(result.length / limitNumber),
    notes: paginatedNotes,
  });
};
// ===============================
// GET /notes/:id
// Get a single note by ID
// ===============================
const getNoteById = (req, res, next) => {
  // Get note ID from route params
  const noteId = parseInt(req.params.id);

  // Find note by ID
  const note = notes.find((note) => note.id === noteId);

  // If note does not exist, pass error to global handler
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  // Return found note
  res.json(note);
};

// ===============================
// POST /notes
// Create a new note
// ===============================
const createNote = (req, res) => {
// Extract and clean content
let { content } = req.body;

// Remove extra spaces
content = content.trim();
  // Get current timestamp
  const currentTime = new Date().toISOString();
if (!content) {
  return res.status(400).json({
    success: false,
    message: "Content cannot be empty",
  });
}
  // Generate a new ID
  const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

  // Create note object
  const newNote = {
    id: newId,
    content: content,
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  // Store note in array
  notes.push(newNote);

  // Return success response
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: newNote,
  });
};
// ===============================
// PUT /notes/:id
// Update note by ID
// ===============================
const updateNote = (req, res, next) => {
  // Get note ID from route params
  const noteId = parseInt(req.params.id);

let { content } = req.body;
content = content.trim();
if (!content) {
  return res.status(400).json({
    success: false,
    message: "Content cannot be empty",
  });
}
  // Find note by ID
  const note = notes.find((note) => note.id === noteId);

  // If note does not exist, pass error to global handler
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  // Update note content
  note.content = content;

  // Update modified timestamp
  note.updatedAt = new Date().toISOString();

  // Return success response
  res.json({
    success: true,
    message: "Note updated successfully",
    note: note,
  });
};
// ===============================
// DELETE /notes/:id
// Delete note by ID
// ===============================
const deleteNote = (req, res, next) => {
  // Get note ID from route params
  const noteId = parseInt(req.params.id);

  // Find note index
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  // If note does not exist, pass error to global handler
  if (noteIndex === -1) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  // Remove note from array
  const deletedNote = notes.splice(noteIndex, 1);

  // Return success response
  res.json({
    success: true,
    message: "Note deleted successfully",
    deleted: deletedNote[0],
  });
};

// ===============================
// Export controller functions
// ===============================
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
