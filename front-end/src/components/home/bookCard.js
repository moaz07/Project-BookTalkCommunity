import "./bookCard.css";

import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="card">
      <div className="border">
        <Link className="link" to={`/book/${book.title}`}>
          <div className="content">
            <div className="c-image">
              <img className="c-img" src={book.posterURL} alt="" />
            </div>
            <div className="c-title">
              <span className="s-title">{book.title}</span>
            </div>
            <div className="c-author">
              <span className="s-author">{book.author}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
