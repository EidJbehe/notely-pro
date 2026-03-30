// ===============================
// Temporary in-memory notes data
// This will be replaced with a database later
// ===============================
const notes = [
  {
    id: 1,
    content: "First note",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    content: "Second note",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

module.exports = notes;
