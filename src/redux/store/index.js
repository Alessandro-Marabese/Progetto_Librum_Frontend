import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import bookReducer from "../reducers/bookReducer";

const rootReducer = combineReducers({
  users: userReducer,
  books: bookReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
