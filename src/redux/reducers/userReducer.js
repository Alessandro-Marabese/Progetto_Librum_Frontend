import { ADD_USER, GET_CURRENT_USER, GET_USER_BY_ID, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  content: [],
  userReviews: {},
  isLoading: false,
  isError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userReviews: {
          ...state.userReviews,
          [action.payload.id]: action.payload,
        },
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
    case ADD_USER:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
