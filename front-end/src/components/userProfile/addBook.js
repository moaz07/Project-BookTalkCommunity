import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatISO } from "date-fns";

import { fetchBooks, postBook } from "../../api/book";
import { setBooks } from "../../redux/bookSlice";

export default function AddBook({ user }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleAddBookClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [category, setCategory] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [language, setLanguage] = useState("");
  const userID = user._id;
  /*   const newDate = new Date();
  const date = newDate.toLocaleString(); */
  const date = formatISO(new Date());

  const addBook = async (value) => {
    await postBook(value);
    const updatedBooks = await fetchBooks();
    dispatch(setBooks(updatedBooks));
    handleCloseModal();
  };

  useEffect(() => {
    const isValid =
      title.trim() !== "" &&
      author.trim() !== "" &&
      pages.trim() !== "" &&
      category !== "" &&
      language !== "" &&
      posterURL.trim() !== "";
    setIsFormValid(isValid);
  }, [title, author, pages, category, language, posterURL]);

  return (
    <div>
      <button className="add-book" onClick={handleAddBookClick}>
        +
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Book</h2>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form>
              <div className="input-add-book-div">
                <input
                  type="text"
                  placeholder="Title"
                  className="input-add-book"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-add-book-div">
                <input
                  type="text"
                  placeholder="Author"
                  className="input-add-book"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="input-add-book-div">
                <select
                  required
                  className="input-add-book"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled selected hidden value="">
                    Category:
                  </option>
                  <option value="cooking">Cooking</option>
                  <option value="cultural">Cultural</option>
                  <option value="dictionary">Dictionary</option>
                  <option value="history">History</option>
                  <option value="novelist">Novelist</option>
                  <option value="religious">Religious</option>
                  <option value="scientific">Scientific</option>
                </select>
              </div>
              <div className="input-add-book-div">
                <select
                  required
                  className="input-add-book"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option disabled selected hidden value="">
                    Language:
                  </option>
                  <option value="arabic">Arabic</option>
                  <option value="french">French</option>
                  <option value="english">English</option>
                </select>
              </div>
              <div className="input-add-book-div">
                <input
                  type="text"
                  placeholder="Number of pages"
                  className="input-add-book"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
              <div className="input-add-book-div">
                <input
                  type="text"
                  placeholder="Poster URL"
                  className="input-add-book"
                  value={posterURL}
                  onChange={(e) => setPosterURL(e.target.value)}
                />
              </div>
              <div className="btn-add-book-div">
                <button
                  className="btn-add-book"
                  disabled={!isFormValid}
                  onClick={() =>
                    addBook({
                      title,
                      author,
                      pages,
                      category,
                      language,
                      posterURL,
                      date,
                      userID,
                    })
                  }
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
