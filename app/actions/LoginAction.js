import axios from 'axios';
import * as types from '../actions/actionTypes';
import * as apis from '../api/sessionApi';


export function loginAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      // const response = await axios.post(apis.loginURL, { email, password });
      dispatch(authenticatedUser());
      history.push('/migration/list');
    } catch (error) {
      dispatch(authenticationError(error.response.data.message));
    }
  };
}
export function authenticatedUser() {
  // localStorage.setItem('user', response.data.token);
  return {
    type: types.AUTHENTICATED
  };
}

export function unAuthenticatedUser() {
  return {
    type: types.UNAUTHENTICATED
  };
}
export function authenticationError(error) {
  return {
    type: types.AUTHENTICATION_ERROR,
    payload: error
  };
}
