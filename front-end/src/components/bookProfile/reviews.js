import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatISO } from "date-fns";

import "./reviews.css";
import { fetchReviews, postReview } from "../../api/review";
import { setReviews } from "../../redux/reviewSlice";
import { fetchAllUsers } from "../../api/user";
import { setUsers } from "../../redux/usersSlice";

export default function Reviews(props) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const reviews = useSelector((state) => state.review);

  const userID = authUser._id;
  const bookID = props.bookID;
  const [content, setContent] = useState("");
  const date = formatISO(new Date());

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

  const addReview = async (value) => {
    await postReview(value);
    const updatedReviews = await fetchReviews();
    dispatch(setReviews(updatedReviews));
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      dispatch(setUsers(data));
    };
    getUsers();
  }, []);

  // get reviews from DB
  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      dispatch(setReviews(data));
    };
    getReviews();
  }, []);

  // Function to get user information by userID
  const findUser = (userID) => {
    return users.find((user) => user._id === userID);
  };

  // Sort reviews by date (newest to oldest)
  const sortedReviews = Object.values(reviews)
    .filter((review) => review.bookID === bookID)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="h2-review">
        <h2>Reviews</h2>
      </div>
      <div className="all-reviews">
        {sortedReviews.map((review) => (
          <div key={review._id}>
            <div className="review-item">
              <div className="review-header">
                <div className="review-header-info">
                  <img
                    src={findUser(review.userID)?.photo}
                    alt={findUser(review.userID)?.userName}
                    className="review-user-photo"
                  />
                  <span className="review-username">
                    {findUser(review.userID)?.userName}
                  </span>
                </div>
                <div className="review-header-date">
                  {formatDateTime(review.date)}
                </div>
              </div>
              <div className="review-content">
                <span>{review.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-review-form">
        <input
          type="text"
          placeholder="Write new review"
          className="input-review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="btn-add-review"
          onClick={() => addReview({ content, date, userID, bookID })}
        >
          Add
        </button>
      </div>
    </div>
  );
}
