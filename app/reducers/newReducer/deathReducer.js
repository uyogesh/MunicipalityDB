const initValue = {
  isLoaded: false
};

export default (state = initValue, action) => {
  switch (action.type) {
    case 'SET_DEATH_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'DEATH_LIST_LOADED':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_DEATH_LIST_PAGES':
      return {
        ...state,
        numberOfPages: action.payload
      };
    case 'SET_DEATH_ENTRY':
      return {
        ...state,
        currentChoice: action.payload
      };
    case 'DEATH_ENTRY_CANCELLED':
      return {
        ...state,
        currentChoice: null
      };
    default:
      return state;
  }
};
