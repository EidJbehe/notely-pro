import { useEffect, useState } from 'react';
import { deleteNote, getNotes, updateNote } from '../api/notes';
import toast from 'react-hot-toast';

interface Note {
  id: number;
  content: string;
}

function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data?.notes ?? []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success('Note deleted');
    } catch (err) {
      console.error('Error deleting note:', err);
      toast.error('Failed to delete note');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleUpdate = async (id: number) => {
    if (!editContent.trim()) {
      toast.error('Note cannot be empty');
      return;
    }

    try {
      await updateNote(id, editContent);

      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, content: editContent } : note))
      );

      setEditingId(null);
      setEditContent('');
      toast.success('Note updated');
    } catch (err) {
      console.error('Error updating note:', err);
      toast.error('Failed to update note');
    }
  };

  const filteredAndSortedNotes = notes
    .filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sort === 'newest' ? b.id - a.id : a.id - b.id));

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Your Notes</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          {notes.length} notes
        </span>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-slate-500"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-2xl border border-slate-300 p-3 outline-none focus:border-slate-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {filteredAndSortedNotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-500">{search ? 'No matching notes found.' : 'No notes yet.'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-sm"
            >
              {editingId === note.id ? (
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-3 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-slate-500"
                />
              ) : (
                <p className="mb-3 text-slate-800">{note.content}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {editingId === note.id ? (
                  <button
                    onClick={() => handleUpdate(note.id)}
                    className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(note)}
                    className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(note.id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>

                {editingId === note.id && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditContent('');
                    }}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
