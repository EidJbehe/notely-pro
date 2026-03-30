import { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';

function HomePage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-3xl font-bold text-slate-900">Notely Pro</h1>
          <p className="mt-1 text-slate-500">Smart notes, clean workflow.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-slate-600">
            Create, edit, search, and organize your notes in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div>
            <NoteForm onCreated={() => setRefresh((prev) => prev + 1)} />
          </div>

          <div>
            <NotesList key={refresh} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
