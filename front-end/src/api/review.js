import axios from "axios";

export const fetchReviews = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/v1/reviews`);
  const data = await response.data;
  return data;
};

export const postReview = async (value) => {
  await axios.post(`http://127.0.0.1:8000/api/v1/reviews`, { ...value });
};
