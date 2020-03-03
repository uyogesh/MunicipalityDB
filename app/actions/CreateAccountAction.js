import axios from 'axios';
import * as types from '../actions/actionTypes';
import * as apis from '../api/sessionApi';


export function createAccountAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const response = await axios.post(apis.createAccountURl, { email, password });
      dispatch(createSuccess(response));
      history.push('/counter');
    } catch (error) {
      dispatch(createError(error.response.data.message));
    }
  };
}
export function createSuccess(response) {
  localStorage.setItem('user', response.data.token);
  return {
    type: types.CREATE_SUCCESS
  };
}


export function createError(error) {
  return {
    type: types.CREATE_ERROR,
    payload: error
  };
}
