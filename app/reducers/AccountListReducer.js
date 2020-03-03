import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_ACCOUNTS:
      return { ...state, latestAccounts: action.payload };
    case types.ACCOUNT_FETCH_FAILED:
      return { ...state, fetchFailed: true };
    case types.ACCOUNT_FETCHING:
      return { ...state, fetchSuccess: false };
    case types.ACCOUNT_FETCH_SUCCESS:
      return { ...state, fetchSuccess: true };
    case types.SET_LIST_KEYS:
      return { ...state, headerKeys: action.payload };
    case types.SET_VISIBLE_LIST:
      return { ...state, visibleAccounts: action.payload };
    default:
      return state;
  }
};

