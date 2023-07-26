import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./bookProfile.css";
import Navbar from "../navbar/navbar";
import Reviews from "./reviews";
import { fetchUser } from "../../api/user";
import { setUser } from "../../redux/userSlice";
import { fetchBooks } from "../../api/book";
import { setBooks } from "../../redux/bookSlice";

export default function BookProfile() {
  const { bookpath } = useParams();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book);
  const users = useSelector((state) => state.users);

  const foundBook = books.find((e) => e.title === bookpath);
  const bookID = foundBook ? foundBook._id : null;
  const title = foundBook ? foundBook.title : null;
  const author = foundBook ? foundBook.author : null;
  const category = foundBook ? foundBook.category : null;
  const pages = foundBook ? foundBook.pages : null;
  const language = foundBook ? foundBook.language : null;
  const posterURL = foundBook ? foundBook.posterURL : null;
  const userID = foundBook ? foundBook.userID : null;

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

  const findUser = (userID) => {
    return users.find((user) => user._id === userID);
  };

  return (
    <div className="main">
      <Navbar />
      <div className="margin"></div>
      <div className="profile-container">
        <div className="profile-details">
          <div className="profile-pic">
            <img className="book-pic" src={posterURL} alt={title} />
          </div>
          <div className="profile-informations">
            <table>
              <tr>
                <td className="td-1">Title :</td>
                <td className="td-2">{title}</td>
              </tr>
              <tr>
                <td className="td-1">Author :</td>
                <td className="td-2">{author}</td>
              </tr>
              <tr>
                <td className="td-1">Category :</td>
                <td className="td-2">{category}</td>
              </tr>
              <tr>
                <td className="td-1">Language :</td>
                <td className="td-2">{language}</td>
              </tr>
              <tr>
                <td className="td-1">Pages :</td>
                <td className="td-2">{pages}</td>
              </tr>
            </table>
            <span className="added-by">
              Added by: {findUser(userID)?.userName}
            </span>
          </div>
        </div>
        <div className="discussion">
          <Reviews bookID={bookID} />
        </div>
      </div>
    </div>
  );
}
