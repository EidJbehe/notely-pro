import { useState } from 'react';
import { createNote } from '../api/notes';
import toast from 'react-hot-toast';

function NoteForm({ onCreated }: { onCreated: () => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Please enter a note');
      return;
    }

    try {
      await createNote(content);
      setContent('');
      onCreated();
      toast.success('Note added successfully');
    } catch (err) {
      console.error('Error creating note:', err);
      toast.error('Failed to add note');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <h2 className="mb-4 text-2xl font-bold text-slate-900">Create Note</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="Write your note here..."
        className="w-full resize-none rounded-2xl border border-slate-300 p-4 text-slate-800 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
      />

      <button
        type="submit"
        className="mt-4 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
