import {
  ADD_REVIEW,
  DELETE_REVIEW,
  GET_REVIEWS_BY_BOOK,
  GET_REVIEWS_BY_BOOK_MYBOOKS,
  GET_REVIEWS_BY_USER,
  GET_REVIEWS_BY_USER_HOMEPAGE,
  IS_LOADING_OFF,
  IS_LOADING_ON,
  UPDATE_REVIEW,
} from "../actions";

const initialState = {
  content: [],
  reviewsByBook: {},
  reviewsByUsers: [],
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
    case GET_REVIEWS_BY_BOOK_MYBOOKS:
      return {
        ...state,
        reviewsByBook: {
          ...state.reviewsByBook,
          [action.payload.libroId]: action.payload.reviews,
        },
        isLoading: false,
        isError: null,
      };
    case GET_REVIEWS_BY_USER:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_REVIEWS_BY_USER_HOMEPAGE:
      return {
        ...state,
        reviewsByUsers: [...(state.reviewsByUsers || []), ...(action.payload.reviews.content || [])],
        isLoading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
        content: [...state.content, action.payload],
        isLoading: false,
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        content: state.content.map((review) => (review.id === action.payload.id ? action.payload : review)),
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
