import { GET_AUTHOR_BY_NAME, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  content: [],
  isLoading: false,
  isError: null,
};

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTHOR_BY_NAME:
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
export default authorReducer;
