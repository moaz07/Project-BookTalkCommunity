import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../navbar/navbar";
import { fetchUser, updateUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

export default function Settings() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuth = async () => {
      const data = await fetchUser();
      dispatch(setUser(data));
    };
    getAuth();
  }, [dispatch]);

  const [photo, setPhoto] = useState(authUser.photo);
  const [userName, setUserName] = useState(authUser.userName);
  const [status, setStatus] = useState(authUser.status);
  const [quote, setQuote] = useState(authUser.quote);
  const [email, setEmail] = useState(authUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { photo, userName, status, quote };
    updateUser(authUser._id, updatedUser);
    navigate("/home");
  };

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
          </div>
        </div>
        <div className="setting">
          <div className="setting-header">
            <h2>Update informations</h2>
          </div>
          <div className="setting-form">
            <div className="input-update-user-div">
              <input
                type="text"
                placeholder="Update photo"
                className="input-update-user"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <div className="input-update-user-div">
              <input
                type="text"
                placeholder="Update username"
                className="input-update-user"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-update-user-div">
              <input
                type="text"
                placeholder="Update status"
                className="input-update-user"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="input-update-user-div">
              <input
                type="text"
                placeholder="Set quote"
                className="input-update-user"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </div>
            <div className="input-update-user-div">
              <input
                type="email"
                placeholder="Update email"
                className="input-update-user"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-update-user-div">
            <button className="btn-update-user" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
