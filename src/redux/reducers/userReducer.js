const initialState = {
  content: [],
  isLoading: false,
  isError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_OK":
      return {
        ...state,
        content: action.payload,
        isLoading: false,
      };
    case "IS_LOADING_ON":
      return {
        ...state,
        isLoading: true,
      };
    case "IS_LOADING_OFF":
      return {
        ...state,
        isLoading: false,
      };
    case "ADD_USER":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
