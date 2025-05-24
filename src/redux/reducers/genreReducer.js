import { GET_BOOKS_BY_GENRE, GET_ALL_GENRES, IS_LOADING_OFF, IS_LOADING_ON } from "../actions";

const initialState = {
  content: [],
  fantasy: [],
  romance: [],
  thriller: [],
  searchedGenre: null,
  isLoading: false,
};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_BY_GENRE: {
      const { genere, books } = action.payload;

      if (["fantasy", "romance", "thriller"].includes(genere)) {
        return {
          ...state,
          [genere]: books,
          isLoading: false,
        };
      }

      return {
        ...state,
        searchedGenre: { genere, books },
        isLoading: false,
      };
    }
    case GET_ALL_GENRES:
      return {
        ...state,
        content: Array.isArray(action.payload) ? action.payload : action.payload.content,
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

export default genreReducer;
