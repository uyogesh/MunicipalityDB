const initValue = {
  isLoaded: false,
  currentChoice: null
};

export default (state = initValue, action) => {
  switch (action.type) {
    case 'SET_MIGRATION_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'MIGRATION_LIST_LOADED':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_MIGRATION_LIST_PAGES':
      return {
        ...state,
        numberOfPages: action.payload
      };
    case 'SET_MIGRATION_ENTRY':
      return {
        ...state,
        currentChoice: action.payload
      };
    case 'ENTRY_CANCELLED':
      return {
        ...state,
        currentChoice: null
      };
    default:
      return state;
  }
};
