import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./navbar.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      try {
        if (!searchTerm.trim()) {
          setSearchResults([]);
          return;
        }
        const response = await axios.get(
          `http://localhost:8000/api/v1/books/search`,
          { params: { searchTerm: searchTerm } }
        );
        console.log(response);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [searchTerm]);

  // Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <Link className="navbar-link" to={`/home`}>
        <div className="navbar-logo">
          <img src="/G-logo.png" alt="Logo" className="g-logo" />
          <span>Home</span>
        </div>
      </Link>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchResults && searchResults.length > 0 && (
          <div className="search-result">
            {searchResults.map((book) => (
              <Link
                className="search-result-link"
                to={`/book/${book.title}`}
                key={book._id}
              >
                <div className="result-item">
                  <img
                    src={book.posterURL}
                    alt={book.title}
                    className="result-item-thumbnail"
                  />
                  <div className="result-item-details">
                    <div className="result-item-title">{book.title}</div>
                    <div className="result-item-author">{book.author}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="navbar-profile">
        <div className="navbar-profile-details">
          <span className="navbar-profile-name">{authUser.userName}</span>
          <img
            src={authUser.photo}
            alt="Profile-Pic"
            className="navbar-profile-photo"
          />
        </div>
        <div className="navbar-dropdown-menu">
          <div className="navbar-dropdown-item">
            <Link className="navbar-dropdown-link" to={`/user/${authUser._id}`}>
              Profile
            </Link>
          </div>
          <div className="navbar-dropdown-item">
            <Link className="navbar-dropdown-link" to={`/user/settings`}>
              Settings
            </Link>
          </div>
          <div className="navbar-dropdown-item">
            <button
              className="navbar-dropdown-logout"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
