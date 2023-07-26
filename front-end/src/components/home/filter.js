import { useDispatch, useSelector } from "react-redux";
import "./filter.css";

import React, { useEffect, useState } from "react";
import { setFilter } from "../../redux/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const books = useSelector((state) => state.book);

  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    let userInterval, bookInterval;

    if (userCount < users.length) {
      userInterval = setInterval(() => {
        setUserCount((prevCount) => prevCount + 1);
      }, 100);
    }

    if (bookCount < books.length) {
      bookInterval = setInterval(() => {
        setBookCount((prevCount) => prevCount + 1);
      }, 100);
    }

    return () => {
      clearInterval(userInterval);
      clearInterval(bookInterval);
    };
  }, [users, books, userCount, bookCount]);

  return (
    <div className="filter-main">
      <div className="filter-main-container">
        <h4>Category :</h4>
        <div className="filterChoice">
          <input
            defaultChecked
            type="radio"
            name="filterChoice"
            value="all"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="all">All</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="cooking"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="cooking">Cooking</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="cultural"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="cultural">Cultural</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="dictionary"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="dictionary">Dictionary</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="history"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="history">History</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="novelist"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="novelist">Novelist</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            value="religious"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="religious">Religious</label>
        </div>
        <div className="filterChoice">
          <input
            type="radio"
            name="filterChoice"
            className="filterChoice"
            value="scientific"
            onClick={(e) => dispatch(setFilter(e.target.value))}
          ></input>
          <label for="scientific">Scientific</label>
        </div>

        <h4>Our Community has</h4>
        <div className="statistic">
          <span>{userCount} Users</span>
        </div>
        <div className="statistic">
          <span>{bookCount} Books</span>
        </div>

        <h4>Have Fun!</h4>
      </div>
    </div>
  );
}
