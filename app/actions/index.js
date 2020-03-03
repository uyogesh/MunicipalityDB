import axios from 'axios';
import { createAccountURl, getAllAccountsURL, getAccountDetailURL } from '../api/sessionApi';
import * as types from '../actions/actionTypes';

const user = localStorage.getItem('user');
const authToken = `Bearer ${user}`;

export const submitCreateUser = (formData) =>

  (dispatch) => {
    const finalData = Object.assign({}, formData, {
      features: {
        billingAcpChecker: {
          limit: 0
        }
      },
      timezone: 'America/Boise',
      disabled: false,
      deleted: false
    });
    return axios.post(`${createAccountURl}`, finalData, { headers: { Authorization: authToken, ContentType: 'application/json' } })
      .then((resp) => dispatch(success(resp)), () => dispatch(failure()));
  };

export function success(resp) {
  const result = `Account created successfully with id${resp.data}`;
  alert(result);// eslint-disable-line no-alert
  return {
    type: types.CREATE_SUCCESS,
    resp
  };
}
export function failure() {
  alert('Account creation Failed');// eslint-disable-line no-alert
  return {
    type: types.CREATE_ERROR
  };
}

export function getAllAccounts(skip, name, sortorder) {
  console.log('from action');
  console.log(name + sortorder);
  return (dispatch) =>
    axios.get(`${getAllAccountsURL}?skip=${skip}&sort=${name}&sortDir=${sortorder}`, { headers: { Authorization: authToken, ContentType: 'application/json' } })
      .then(
        resp => {
          dispatch({ type: types.SET_LIST_KEYS, payload: getKeys(resp.data.results) });
          return resp;
        }
        , (error) => { dispatch({ type: types.ACCOUNT_FETCH_FAILED, error }); }
      )
      .then((resp) => {
        console.log('Mystery Response');
        console.log(resp.data);
        dispatch({
          type: types.GET_ALL_ACCOUNTS,
          payload: { accountList: resp.data.results, numberOfPages: resp.data.resultCount }
        });
        return dispatch({ type: types.ACCOUNT_FETCH_SUCCESS, payload: { fetchSuccess: true } });
      });
}

function getKeys(resp) {
  const val = [...resp];
  const result = {
    state: [],
    provider: [],
    owner: []
  };
  val.forEach((element) => {
    console.log(element);
    if (!result.state.includes(element.state) && element.state) {
      result.state.push(element.state);
    }
    if (!result.owner.includes(element.owner && element.owner)) {
      result.owner.push(element.owner);
    }
    if (!result.provider.includes(element.numberOfProviders) && element.numberOfProviders) {
      result.provider.push(element.numberOfProviders);
    }
  });
  console.log('From Action Keys: ');
  console.log(result);
  return result;
}

export function listAccountLoading() {
  return (dispatch) => {
    dispatch({ type: types.ACCOUNT_FETCHING });
  };
}

export function filterList(key, value, list) {
  return (dispatch) => {
    const result = [];
    list.forEach((listItem) => {
      if (listItem[key] === value) {
        result.push(listItem);
      }
    });
    dispatch({
      type: 'FILTER_LIST',
      payload: { filter: { filterKey: key, filterValue: value } }
    });
    setVisibleList(result);
  };
}

function setVisibleList(list) {
  return (dispatch) => {
    dispatch({ type: 'SET_VISIBLE_LIST', payload: [...list] });
  };
}


export function getAccountDetail(id) {
  return (dispatch) =>
    axios.get(`${getAccountDetailURL}/${id}`, { headers: { Authorization: authToken, ContentType: 'application/json' } })
      .then(
        resp => {
          dispatch({
            type: types.GET_ACCOUNT_DETAIL,
            payload: { accountDetail: resp.data }
          });
          return dispatch({ type: types.ACCOUNT_FETCH_SUCCESS, payload: { fetchSuccess: true } });
        }
        , (error) => { dispatch({ type: types.ACCOUNT_FETCH_FAILED, error }); }
      );
}
