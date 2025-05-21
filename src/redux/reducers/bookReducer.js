import { GET_BOOK_BY_ID, GET_BOOKS_BY_AUTHOR, GET_BOOKS_BY_GENRE, GET_BOOKS_BY_TITLE, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  content: [],
  isLoading: false,
  isError: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_BY_TITLE:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_BOOKS_BY_AUTHOR:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_BOOKS_BY_GENRE:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_BOOK_BY_ID:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case IS_LOADING_ON:
      return {
        ...state,
        isLoading: true,
      };
    case IS_LOADING_OFF:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default bookReducer;
