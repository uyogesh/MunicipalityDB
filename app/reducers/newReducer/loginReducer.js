const initialValue = {
  auth_loading: false,
  auth_failed: false,
  authenticated: false,
  selected_user: null,
  showCreateUser: false
};

export default (state = initialValue, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        auth_loading: true,
        auth_failed: false
      };
    case 'AUTH_FAILED':
      return {
        ...state,
        auth_failed: true
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        authenticated: true,
        role: action.payload
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'SELECT_USER':
      return {
        ...state,
        selected_user: action.payload
      };
    case 'DESELECT_USER':
      return {
        ...state,
        selected_user: null
      };
    case 'SHOW_CREATE_USER':
      return {
        ...state,
        showCreateUser: true
      };
    case 'HIDE_CREATE_USER':
      return {
        ...state,
        showCreateUser: false
      };
    default:
      return state;
  }
};
