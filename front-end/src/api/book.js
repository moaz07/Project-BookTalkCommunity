import axios from "axios";

export const fetchBooks = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/v1/books`);
  const data = await response.data;
  return data;
};

export const postBook = async (value) => {
  await axios.post(`http://127.0.0.1:8000/api/v1/books`, { ...value });
};

export const deleteBook = async (bookId) => {
  await axios.delete(`http://localhost:8000/api/v1/books/${bookId}`);
};
