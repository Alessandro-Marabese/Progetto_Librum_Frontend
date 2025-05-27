export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const ADD_USER = "ADD_USER";
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
export const DELETE_USERBOOK = "DELETE_USERBOOK";

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
