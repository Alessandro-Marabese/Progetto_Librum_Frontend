import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";
import genreReducer from "../reducers/genreReducer";
import userBookReducer from "../reducers/userBookReducer";
import reviewReducer from "../reducers/reviewReducer";

const rootReducer = combineReducers({
  users: userReducer,
  books: bookReducer,
  authors: authorReducer,
  genres: genreReducer,
  userBook: userBookReducer,
  reviews: reviewReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
