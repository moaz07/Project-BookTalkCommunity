import { createSlice } from "@reduxjs/toolkit";

let id = 1;

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser, addBook } = userSlice.actions;
export default userSlice.reducer;
