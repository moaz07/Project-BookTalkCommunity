import { createSlice } from "@reduxjs/toolkit";

let id = 1;

const bookSlice = createSlice({
  name: "book",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        id: id++,
        ...action.payload,
      };
      state.push(newBook);
    },

    setBooks: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBooks, addBook } = bookSlice.actions;
export default bookSlice.reducer;
