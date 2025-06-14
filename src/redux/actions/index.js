export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_COMMENTS_BY_ID = "GET_USER_COMMENTS_BY_ID";
export const GET_OTHER_USER = "GET_OTHER_USER";
export const SEARCH_USERS = "SEARCH_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_AVATAR = "UPDATE_USER_AVATAR";
export const IS_LOADING_ON = "IS_LOADING_ON";
export const IS_LOADING_OFF = "IS_LOADING_OFF";
export const GET_BOOKS_BY_TITLE = "GET_BOOKS_BY_TITLE";
export const GET_BOOKS_BY_AUTHOR = "GET_BOOKS_BY_AUTHOR";
export const GET_BOOKS_BY_GENRE = "GET_BOOKS_BY_GENRE";
export const GET_BOOK_BY_ID = "GET_BOOK_BY_ID";
export const GET_AUTHOR_BY_NAME = "GET_AUTHOR_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const ADD_USERBOOK = "ADD_USERBOOK";
export const GET_USERBOOKS_BY_USER = "GET_USERBOOKS_BY_USER";
export const UPDATE_USERBOOK = "UPDATE_USERBOOK";
export const DELETE_USERBOOK = "DELETE_USERBOOK";
export const GET_REVIEWS_BY_BOOK = "GET_REVIEWS_BY_BOOK";
export const GET_REVIEWS_BY_BOOK_MYBOOKS = "GET_REVIEWS_BY_BOOK_MYBOOKS";
export const GET_REVIEWS_BY_USER = "GET_REVIEWS_BY_USER";
export const GET_REVIEWS_BY_USER_HOMEPAGE = "GET_REVIEWS_BY_USER_HOMEPAGE";
export const ADD_REVIEW = "ADD_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const GET_COMMENTS_BY_REVIEW = "GET_COMMENTS_BY_REVIEW";
export const GET_COMMENTS_BY_USER = "GET_COMMENTS_BY_USER";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const GET_FRIENDS = "GET_FRIENDS";
export const GET_USER_FRIENDS = "GET_USER_FRIENDS";
export const GET_FRIENDS_REQUESTS = "GET_FRIENDS_REQUESTS";
export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const DECLINE_FRIEND_REQUEST = "DECLINE_FRIEND_REQUEST";

export const registerUser = (userData) => {
  return async (dispatch) => {
    console.log(userData);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/utenti/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_USER, payload: data });
        return data;
      } else {
        throw new Error("Errore durante la registrazione dell'utente");
      }
    } catch (error) {
      console.log("Errore nella registrazione dell'utente", error);
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    console.log(username, password);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/utenti/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_USER, payload: data });
        sessionStorage.setItem("token", data.token);
        return data;
      } else {
        throw new Error("Errore durante il login dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il login dell'utente", error);
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_CURRENT_USER, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dell'utente corrente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dell'utente corrente", error);
      dispatch({
        type: GET_CURRENT_USER,
        payload: {
          error: {
            message: error.message,
          },
        },
      });
    }
  };
};

export const getViewedUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      console.log("🎯 token:", token);
      const response = await fetch(`${apiUrl}/utenti/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_OTHER_USER, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dell'utente corrente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dell'utente corrente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getUserById = (utenteId, context = "review") => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      console.log("🎯 token:", token);
      const response = await fetch(`${apiUrl}/utenti/${utenteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (context === "comment") {
          dispatch({ type: GET_USER_COMMENTS_BY_ID, payload: data });
        } else {
          dispatch({ type: GET_USER_BY_ID, payload: data });
        }
        return data;
      } else {
        throw new Error("Errore durante il recupero dell'utente corrente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dell'utente corrente", error);
      dispatch({
        type: GET_CURRENT_USER,
        payload: {
          error: {
            message: error.message,
          },
        },
      });
    }
  };
};

export const getFriendsByUser = (utenteId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/amici/${utenteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_FRIENDS, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero degli amici");
      }
    } catch (error) {
      console.log("Errore durante il recupero degli amici", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};
export const getFriendsByOtherUser = (utenteId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/amici/${utenteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_USER_FRIENDS, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero degli amici");
      }
    } catch (error) {
      console.log("Errore durante il recupero degli amici", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const searchUsers = (query) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/search?query=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: SEARCH_USERS, payload: data });
        return data;
      } else {
        throw new Error("Errore durante la ricerca degli utenti");
      }
    } catch (error) {
      console.log("Errore durante la ricerca degli utenti", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_USER, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiornamento dell'utente");
      }
    } catch (error) {
      console.log("Errore durante l'aggiornamento dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const updateUserAvatar = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/utenti/${id}/upload`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_USER_AVATAR, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiornamento dell'utente");
      }
    } catch (error) {
      console.log("Errore durante l'aggiornamento dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};
export const getBooksByTitle = (titolo) => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/libri/titolo/${encodeURIComponent(titolo)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_BOOKS_BY_TITLE, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri", error);
    }
  };
};
export const getBooksByAuthor = (autore) => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/libri/autore/${encodeURIComponent(autore)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_BOOKS_BY_AUTHOR, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri", error);
    }
  };
};

export const getBooksByAuthorId = (autoreId) => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/libri/autore/id/${encodeURIComponent(autoreId)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_BOOKS_BY_AUTHOR, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri per autore");
      }
    } catch (error) {
      console.error("Errore durante il recupero dei libri per autore", error);
    }
  };
};
export const getBooksByGenre = (genere) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/libri/genere/${encodeURIComponent(genere)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_BOOKS_BY_GENRE,
          payload: {
            genere,
            books: data,
          },
        });
        dispatch({ type: IS_LOADING_OFF });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri", error);
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getBookById = (id) => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const decodedId = decodeURIComponent(id);
      const response = await fetch(`${apiUrl}/libri/id?id=${decodedId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_BOOK_BY_ID, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero del libro");
      }
    } catch (error) {
      console.log("Errore durante il recupero del libro", error);
    }
  };
};

export const getAuthorByName = (name) => {
  return async (dispatch) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/autori/nome/${name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_AUTHOR_BY_NAME, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dell'autore");
      }
    } catch (error) {
      console.log("Errore durante il recupero dell'autore", error);
    }
  };
};

export const getAllGenres = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/generi`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: GET_ALL_GENRES, payload: data });

        return data;
      } else {
        throw new Error("Errore durante il recupero dei genere");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei genere", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getUserBookByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/userbook/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_USERBOOKS_BY_USER, payload: data });

        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const addUserBook = (book) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/userbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_USERBOOK, payload: data });

        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const updateStatusUserbook = (utenteId, libroId, status) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/userbook/${utenteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ libroId, nuovoStato: status }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_USERBOOK, payload: data });

        return data;
      } else {
        throw new Error("Errore durante il recupero dei libri dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei libri dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getReviewsByBook = (bookId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const decodedId = decodeURIComponent(bookId);
      const response = await fetch(`${apiUrl}/review/libro?libroId=${decodedId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_REVIEWS_BY_BOOK, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero delle recensioni");
      }
    } catch (error) {
      console.log("Errore durante il recupero delle recensioni", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getReviewsByBookMyBooks = (bookId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const decodedId = decodeURIComponent(bookId);
      const response = await fetch(`${apiUrl}/review/libro?libroId=${decodedId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_REVIEWS_BY_BOOK_MYBOOKS, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero delle recensioni");
      }
    } catch (error) {
      console.log("Errore durante il recupero delle recensioni", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getReviewsByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/review/utente/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_REVIEWS_BY_USER, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero delle recensioni dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero delle recensioni dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getReviewsByUserHomepage = (utenteId, page = 0, reset = false) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/review/utente/${utenteId}?page=${page}&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_REVIEWS_BY_USER_HOMEPAGE, payload: { utenteId, reviews: data, reset } });
        return data;
      } else {
        throw new Error("Errore durante il recupero delle recensioni dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero delle recensioni dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_REVIEW, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiunta della recensione");
      }
    } catch (error) {
      console.log("Errore durante l'aggiunta della recensione", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/review/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: DELETE_REVIEW, payload: data });
        return data;
      } else {
        throw new Error("Errore durante la cancellazione della recensione");
      }
    } catch (error) {
      console.log("Errore durante la cancellazione della recensione", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const updateReview = (review) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/review/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: UPDATE_REVIEW, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiornamento della recensione");
      }
    } catch (error) {
      console.log("Errore durante l'aggiornamento della recensione", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getCommentByReview = (reviewId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON, reviewId });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/commenti/review/${reviewId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_COMMENTS_BY_REVIEW, reviewId, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei commenti");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei commenti", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF, reviewId });
    }
  };
};

export const getCommentByUser = (userId, page = 0, reset = false) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/commenti/utente/${userId}?page=${page}&size=10`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_COMMENTS_BY_USER, payload: data, reset });
        return data;
      } else {
        throw new Error("Errore durante il recupero dei commenti dell'utente");
      }
    } catch (error) {
      console.log("Errore durante il recupero dei commenti dell'utente", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const addComment = (testo, utenteId, reviewId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");

      if (!utenteId) {
        throw new Error("Utente non autenticato");
      }
      const newComment = {
        testo,
        utenteId,
        reviewId,
      };

      const response = await fetch(`${apiUrl}/commenti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_COMMENT, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiunta del commento");
      }
    } catch (error) {
      console.log("Errore durante l'aggiunta del commento", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const updateComment = (commentId, testo, utenteId, reviewId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/commenti/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ testo, utenteId, reviewId }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_COMMENT, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'aggiornamento del commento");
      }
    } catch (error) {
      console.log("Errore durante l'aggiornamento del commento", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/commenti/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
        return data;
      } else {
        throw new Error("Errore durante la cancellazione del commento");
      }
    } catch (error) {
      console.log("Errore durante la cancellazione del commento", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const getFriendsRequest = (receiverId, stato) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/amici/requests/${receiverId}/${stato}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_FRIENDS_REQUESTS, payload: data });
        return data;
      } else {
        throw new Error("Errore durante il recupero degli amici");
      }
    } catch (error) {
      console.log("Errore durante il recupero degli amici", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const sendFriendRequest = (senderId, receiverId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/amici/sendRequest`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Errore durante l'invio della richiesta di amicizia");
      }
    } catch (error) {
      console.log("Errore durante l'invio della richiesta di amicizia", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const acceptFriendRequest = (requestId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/amici/acceptRequest/${requestId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: data });
        return data;
      } else {
        throw new Error("Errore durante l'accettazione della richiesta di amicizia");
      }
    } catch (error) {
      console.log("Errore durante l'accettazione della richiesta di amicizia", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};

export const rejectFriendRequest = (requestId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_LOADING_ON });
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${apiUrl}/amici/declineRequest/${requestId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: DECLINE_FRIEND_REQUEST, payload: data });
        return data;
      } else {
        throw new Error("Errore durante la rifiuto della richiesta di amicizia");
      }
    } catch (error) {
      console.log("Errore durante la rifiuto della richiesta di amicizia", error);
    } finally {
      dispatch({ type: IS_LOADING_OFF });
    }
  };
};
