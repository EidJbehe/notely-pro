import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getNotes = async () => {
  const res = await API.get('/notes');
  return res.data;
};

export const createNote = async (content: string) => {
  const res = await API.post('/notes', { content });
  return res.data;
};

export const updateNote = async (id: number, content: string) => {
  const res = await API.put(`/notes/${id}`, { content });
  return res.data;
};

export const deleteNote = async (id: number) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};
