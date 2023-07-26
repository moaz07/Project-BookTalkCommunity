import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import reviewSlice from "./reviewSlice";
import userSlice from "./userSlice";
import usersSlice from "./usersSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    book: bookSlice,
    review: reviewSlice,
    filter: filterSlice,
  },
});
