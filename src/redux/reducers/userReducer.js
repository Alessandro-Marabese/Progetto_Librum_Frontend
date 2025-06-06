import {
  ADD_USER,
  GET_CURRENT_USER,
  GET_OTHER_USER,
  GET_USER_BY_ID,
  GET_USER_COMMENTS_BY_ID,
  IS_LOADING_OFF,
  IS_LOADING_ON,
  SEARCH_USERS,
  UPDATE_USER,
  UPDATE_USER_AVATAR,
} from "../actions";

const initialState = {
  content: [],
  utenteVisitato: [],
  ricercaUtenti: [],
  userReviews: {},
  userComments: {},
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
    case GET_USER_COMMENTS_BY_ID:
      return {
        ...state,
        userComments: {
          ...state.userComments,
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
    case GET_OTHER_USER:
      return {
        ...state,
        utenteVisitato: action.payload,
      };
    case SEARCH_USERS:
      return {
        ...state,
        ricercaUtenti: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        content: state.content.map((user) => (user.id === action.payload.id ? action.payload : user)),
      };
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        content: state.content.map((user) => (user.id === action.payload.id ? action.payload : user)),
      };
    default:
      return state;
  }
};

export default userReducer;
