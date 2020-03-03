import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ACCOUNT_DETAIL:
      console.log('from reducer');
      console.log(action.payload);
      return { ...state, accountDetail: action.payload };
    case types.ACCOUNT_FETCH_FAILED:
      return { ...state, fetchFailed: true };
    case types.ACCOUNT_FETCHING:
      return { ...state, fetchSuccess: false };
    case types.ACCOUNT_FETCH_SUCCESS:
      return { ...state, fetchSuccess: true };
    default:
      return state;
  }
};

