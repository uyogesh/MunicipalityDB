
import connection from '../db/index';

const mongodb = require('mongodb');

export const getAllUsers = () => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('users')
      .find({}, (erro, result) => {
        if (!erro) {
          result.toArray((error, res) => {
            console.log(res);
            dispatch({
              type: 'SET_USERS',
              payload: res
            });
          });
        }
      });
  });
};

export const updateUser = (userId, formData) => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('users')
      .update({ _id: new mongodb.ObjectID(userId) }, formData, (error, response) => {
        if (!error) {
          dispatch(deselectUser());
          dispatch(getAllUsers());
        }
      });
  });
};

export const deleteUser = (userId) => (dispatch) => {
  console.log(userId);
  connection((err, client) => {
    client.db('municipality')
      .collection('users')
      .remove({ _id: new mongodb.ObjectID(userId) }, (error, result) => {
        if (!err) {
          dispatch(getAllUsers());
          console.log(result);
        }
      });
  });
};

export const selectUser = (userId) => (dispatch) => {
  dispatch({
    type: 'SELECT_USER',
    payload: userId
  });
};


export const createUser = (formData) => (dispatch) => {
  connection((err, client) => {
    client.db('municipality')
      .collection('users')
      .insertOne(formData, (error, resp) => {
        if (!error) {
          dispatch({
            type: 'USER_ACCOUNT_CREATED'
          });
          dispatch(hideCreateDialog());
          dispatch(getAllUsers());
        }
      });
  });
};

export const deselectUser = () => ({
  type: 'DESELECT_USER'
});


export const showCreateDialog = () => ({
  type: 'SHOW_CREATE_USER'
});

export const hideCreateDialog = () => ({
  type: 'HIDE_CREATE_USER'
});
