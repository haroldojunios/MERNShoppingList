import axios from "axios";

import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const registerUser =
  ({ name, email, password }) =>
  dispatch => {
    axios
      .post("api/users", { name, email, password })
      .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// Login user
export const loginUser =
  ({ email, password }) =>
  dispatch => {
    axios
      .post("api/auth", { email, password })
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

// Logout user
export const logoutUser = () => {
  return { type: LOGOUT_SUCCESS };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = { headers: { "Content-type": "application/json" } };

  // if token add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
