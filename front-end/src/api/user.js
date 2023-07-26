import axios from "axios";

export const signupUser = async (value) => {
  await axios.post(`http://localhost:8000/api/v1/users/signup`, { ...value });
};

export const loginUser = async (value) => {
  await axios.post(`http://localhost:8000/api/v1/users/login`, { ...value });
};

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `http://localhost:8000/api/v1/users/useraccount`,
    { headers: { Authorization: token } }
  );
  return data;
};

export const updateUser = async (userId, value) => {
  await axios.put(`http://localhost:8000/api/v1/users/${userId}`, value);
};

export const fetchAllUsers = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/v1/users`);
  const data = await response.data;
  return data;
};
