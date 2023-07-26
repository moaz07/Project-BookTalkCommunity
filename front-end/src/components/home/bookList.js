import "./bookList.css";
import { fetchBooks } from "../../api/book";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookCard from "./bookCard";
import { setBooks } from "../../redux/bookSlice";

export default function BookList() {
  // get data from redux
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book);
  const filter = useSelector((state) => state.filter.choice);

  // get data from DB
  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      dispatch(setBooks(data));
    };
    getBooks();
  }, [dispatch]);

  // filter books
  const filteredBooks =
    filter === "all"
      ? Object.values(books)
      : Object.values(books).filter((book) => book.category === filter);

  // Sort books by date (newest to oldest)
  const sortedBooks = filteredBooks.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="list">
      {sortedBooks.map((e) => (
        <BookCard key={e._id} book={e} />
      ))}
    </div>
  );
}
