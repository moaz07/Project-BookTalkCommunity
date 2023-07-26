import { createSlice } from "@reduxjs/toolkit";

let id = 1;
const reviewSlice = createSlice({
  name: "Review",
  initialState: [],
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        id: id++,
        content: "",
        bookId: "",
        userId: "",
      };
      state.push(newReview);
    },

    setReviews: (state, action) => {
      return action.payload;
    },
  },
});

export const { setReviews, addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
