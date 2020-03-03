import connection from '../db/index';
import * as types from '../actions/actionTypes';

export const logUserIn = ({ email, password }, history) => (dispatch) => {
  dispatch({
    type: 'AUTH_LOADING'
  });
  connection((err, client) => {
    client.db('municipality')
      .collection('users')
      .find({
        username: email,
        password
      }, (error, result) => {
        console.log(result);
        if (!error) {
          result.toArray((errors, res) => {
            if (res.length && !errors) {
              console.log(res);
              dispatch(authenticatedUser(res[0].role));
              history.push('/dashboard');
            } else {
              dispatch({
                type: 'AUTH_FAILED'
              });
            }

            return 0;
          });
        }
      });
  });
};

export function authenticatedUser(res) {
  // localStorage.setItem('user', response.data.token);
  return {
    type: 'AUTH_SUCCESS',
    payload: res
  };
}


export const signUpUser = (username, password, permissions) => (dispatch) => {

};
