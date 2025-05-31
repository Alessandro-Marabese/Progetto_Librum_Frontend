import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENTS_BY_REVIEW, GET_COMMENTS_BY_USER, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  commentsByReview: {},
  commentsByUser: [],
  isLoadingByReview: {},
  isLoading: false,
  isError: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_REVIEW:
      return {
        ...state,
        commentsByReview: {
          ...state.commentsByReview,
          [action.reviewId]: action.payload,
        },
        isLoadingByReview: {
          ...state.isLoadingByReview,
          [action.reviewId]: false,
        },
      };
    case GET_COMMENTS_BY_USER:
      return {
        ...state,
        commentsByUser: action.payload,
        isLoading: false,
      };
    case ADD_COMMENT: {
      const reviewId = action.payload.reviewId;
      return {
        ...state,
        commentsByReview: {
          ...state.commentsByReview,
          [reviewId]: [...(state.commentsByReview[reviewId] || []), action.payload],
        },
      };
    }
    case DELETE_COMMENT: {
      const { reviewId, commentId } = action.payload;
      return {
        ...state,
        commentsByReview: {
          ...state.commentsByReview,
          [reviewId]: state.commentsByReview[reviewId].filter((comment) => comment.id !== commentId),
        },
      };
    }
    case IS_LOADING_ON:
      return {
        ...state,
        isLoadingByReview: {
          ...state.isLoadingByReview,
          [action.reviewId]: true,
        },
      };
    case IS_LOADING_OFF:
      return {
        ...state,
        isLoadingByReview: {
          ...state.isLoadingByReview,
          [action.reviewId]: false,
        },
      };
    default:
      return state;
  }
};
export default commentReducer;
