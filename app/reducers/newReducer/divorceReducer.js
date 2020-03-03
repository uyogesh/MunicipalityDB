const initValue = {
  isLoaded: false
};

export default (state = initValue, action) => {
  switch (action.type) {
    case 'SET_DIVORCE_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'DIVORCE_LIST_LOADED':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_DIVORCE_LIST_PAGES':
      return {
        ...state,
        numberOfPages: action.payload
      };
    case 'SET_DIVORCE_ENTRY':
      return {
        ...state,
        currentChoice: action.payload
      };
    case 'DIVORCE_ENTRY_CANCELLED':
      return {
        ...state,
        currentChoice: null
      };
    default:
      return state;
  }
};

