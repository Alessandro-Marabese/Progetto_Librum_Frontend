export const FETCH_USER_OK = "FETCH_USER_OK";
export const ADD_USER = "ADD_USER";
export const IS_LOADING_ON = "IS_LOADING_ON";
export const IS_LOADING_OFF = "IS_LOADING_OFF";

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
