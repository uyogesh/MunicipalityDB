const initValue = {
  isLoaded: false
};

export default (state = initValue, action) => {
  switch (action.type) {
    case 'SET_BIRTH_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'BIRTH_LIST_LOADED':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_BIRTH_LIST_PAGES':
      return {
        ...state,
        numberOfPages: action.payload
      };
    case 'SET_BIRTH_ENTRY':
      return {
        ...state,
        currentChoice: action.payload
      };
    case 'BIRTH_ENTRY_CANCELLED':
      return {
        ...state,
        currentChoice: null
      };
    default:
      return state;
  }
};
