import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import bookReducer from "../reducers/bookReducer";
import authorReducer from "../reducers/authorReducer";

const rootReducer = combineReducers({
  users: userReducer,
  books: bookReducer,
  authors: authorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
