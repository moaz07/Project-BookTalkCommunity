import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import BookProfile from "./components/bookProfile/bookProfile";
import UserProfile from "./components/userProfile/userProfile";
import Settings from "./components/userProfile/settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user/:userID" element={<UserProfile />}></Route>
        <Route path="/book/:bookpath" element={<BookProfile />}></Route>
        <Route path="/user/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
