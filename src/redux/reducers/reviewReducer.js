import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEWS_BY_BOOK, GET_REVIEWS_BY_USER, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  content: [],
  isLoading: false,
  isError: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_BOOK:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_REVIEWS_BY_USER:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
        content: [...state.content, action.payload],
        isLoading: false,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        content: state.content.filter((review) => review.id !== action.payload),
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
export default reviewReducer;
