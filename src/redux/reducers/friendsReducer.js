import {
  ACCEPT_FRIEND_REQUEST,
  ADD_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
  GET_FRIENDS,
  GET_FRIENDS_REQUESTS,
  GET_USER_FRIENDS,
  IS_LOADING_OFF,
  IS_LOADING_ON,
} from "../actions";

const initialState = {
  myFriends: [],
  userFriends: [],
  friendsRequest: [],
  isLoading: false,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        myFriends: action.payload.content,
        isLoading: false,
      };
    case GET_USER_FRIENDS:
      return {
        ...state,
        userFriends: action.payload,
      };
    case GET_FRIENDS_REQUESTS:
      return {
        ...state,
        friendsRequest: action.payload.content,
        isLoading: false,
      };
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        friendsRequest: [...state.friendsRequest, action.payload],
        isLoading: false,
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        content: state.content.some((friend) => friend.id === action.payload.id) ? state.content : [...state.content, action.payload],
        friendsRequest: state.friendsRequest.filter((request) => request.id !== action.payload.id),
        isLoading: false,
      };
    case DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        friendsRequest: state.friendsRequest.filter((request) => request.id !== action.payload.id),
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

export default friendsReducer;
