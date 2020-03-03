import * as types from '../actions/actionTypes';

export function signOutUserAction() {
  localStorage.removeItem('token');
  return async (dispatch) => {
    dispatch(unAuthenticatedUser());
  };
}

export function unAuthenticatedUser() {
  return {
    type: types.UNAUTHENTICATED,
  };
}
