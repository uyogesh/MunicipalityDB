const initValue = {
  isLoaded: false
};

export default (state = initValue, action) => {
  switch (action.type) {
    case 'SET_MARRIAGE_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'MARRIAGE_LIST_LOADED':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_MARRIAGE_LIST_PAGES':
      return {
        ...state,
        numberOfPages: action.payload
      };
    case 'SET_MARRIAGE_ENTRY':
      return {
        ...state,
        currentChoice: action.payload
      };
    case 'MARRIAGE_ENTRY_CANCELLED':
      return {
        ...state,
        currentChoice: null
      };
    default:
      return state;
  }
};
