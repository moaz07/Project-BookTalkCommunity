import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./home.css";
import Login from "../login/login";
import Navbar from "../navbar/navbar";
import Filter from "./filter";
import BookList from "./bookList";
import { fetchUser } from "../../api/user";
import { fetchAllUsers } from "../../api/user";
import { setUser } from "../../redux/userSlice";
import { setUsers } from "../../redux/usersSlice";

export default function Home() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);
  console.log(authUser);
  const token = localStorage.getItem("token");

  //get Auth
  useEffect(() => {
    const getAuth = async () => {
      const data = await fetchUser();
      dispatch(setUser(data));
      if (data) {
        // User is authenticated, perform necessary actions
        console.log("User is authenticated:", data);
      } else {
        // User is not authenticated, handle accordingly
        console.log("User is not authenticated");
      }
    };
    getAuth();
  }, []);

  // get all Users from DB
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetchAllUsers();
      dispatch(setUsers(data));
    };
    getAllUsers();
  }, []);

  return (
    <div className="main">
      {token ? (
        <div>
          <Navbar />
          <div className="margin"></div>
          <div className="home-container">
            <Filter />
            <BookList />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
