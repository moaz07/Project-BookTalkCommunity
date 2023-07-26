import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./userProfile.css";
import Navbar from "../navbar/navbar";
import AddBook from "./addBook";
import { deleteBook, fetchBooks } from "../../api/book";
import { setBooks } from "../../redux/bookSlice";
import { fetchReviews } from "../../api/review";
import { setReviews } from "../../redux/reviewSlice";
import { setUser } from "../../redux/userSlice";
import { fetchUser } from "../../api/user";

export default function UserProfile() {
  const authUser = useSelector((state) => state.user);
  const books = useSelector((state) => state.book);
  const reviews = useSelector((state) => state.review);
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();
  console.log(reviews);

  useEffect(() => {
    const getAuth = async () => {
      const data = await fetchUser();
      dispatch(setUser(data));
    };
    getAuth();
  }, [dispatch]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      dispatch(setBooks(data));
    };
    getBooks();
  }, [dispatch]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      dispatch(setReviews(data));
    };
    getReviews();
  }, [dispatch]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const findBook = (bookID) => {
    return books.find((book) => book._id === bookID);
  };

  // Sort books by date (newest to oldest)
  const sortedBooks = Object.values(books)
    .filter((book) => book.userID === authUser._id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Sort reviews by date (newest to oldest)
  const sortedReviews = Object.values(reviews)
    .filter((review) => review.UserID === authUser._id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="main">
      <Navbar />
      <div className="margin"></div>
      <div className="profile-container">
        <div className="profile-details">
          <div className="profile-pic">
            <img
              className="user-pic"
              src={authUser.photo}
              alt={authUser.userName}
            />
          </div>
          <div className="profile-informations">
            <table>
              <tr>
                <td className="td-2">{authUser.userName}</td>
              </tr>
              <tr>
                <td className="td-2">{authUser.status}</td>
              </tr>
              <tr>
                <td className="td-2">{authUser.email}</td>
              </tr>
            </table>
            <div className="quote">
              <span>"{authUser.quote}"</span>
            </div>
          </div>
        </div>
        <div className="user-posts">
          <h2>My Posts</h2>
          <div className="posts-choose">
            <button
              className="btn-posts-choose"
              onClick={() => setDisplay(true)}
            >
              Books
            </button>
            <button
              className="btn-posts-choose"
              onClick={() => setDisplay(false)}
            >
              Reviews
            </button>
          </div>
          {display ? (
            <div className="user-posts-items">
              {sortedBooks.map((book) => (
                <Link
                  className="link"
                  to={`/book/${book.title}`}
                  key={book._id}
                >
                  <div className="user-posts-book-item" key={book._id}>
                    <div className="post-item-book-img">
                      <img src={book.posterURL} alt={book.title} />
                    </div>
                    <div>
                      <div>
                        <span>{book.title}</span>
                      </div>
                      <div>
                        <span>{book.author}</span>
                      </div>
                      <div>
                        <span>{book.category}</span>
                      </div>
                    </div>
                    <div>
                      <div>added at</div>
                      <div>{formatDateTime(book.date)}</div>
                    </div>
                    <div>
                      <button
                        className="user-delete-book"
                        onClick={() => deleteBook(book._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="user-posts-items">
              {sortedReviews.map((review) => (
                <div key={review._id}>
                  <div className="review-item">
                    <div className="review-header">
                      <div className="review-header-info">
                        <span className="review-username">
                          {findBook(review.bookID).title}
                        </span>
                      </div>
                      <div className="review-header-date">
                        {formatDateTime(review.date)}
                      </div>
                    </div>
                    <div className="review-content show-review">
                      <div>
                        <span>{review.content}</span>
                      </div>

                      <button
                        className="user-delete-book"
                        onClick={() => deleteBook(review._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddBook user={authUser} />
    </div>
  );
}
