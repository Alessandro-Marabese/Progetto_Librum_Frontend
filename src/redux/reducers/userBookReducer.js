import { ADD_USERBOOK, DELETE_USERBOOK, GET_USERBOOKS_BY_USER, IS_LOADING_OFF, IS_LOADING_ON, UPDATE_USERBOOK } from "../actions";

const initialState = {
  content: [],
  isLoading: false,
  isError: null,
};

const userBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERBOOK:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case GET_USERBOOKS_BY_USER:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case DELETE_USERBOOK:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case UPDATE_USERBOOK:
      return {
        ...state,
        content: state.content.map((userbook) => (userbook.id === action.payload.id ? action.payload : userbook)),
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
export default userBookReducer;
