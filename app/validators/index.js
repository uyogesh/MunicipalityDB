export const validateMoreThan10 = (value) => {
  if (value) {
    if (value.length < 10) {
      return ' Must be longer than 10';
    }
  }
  return undefined;
};

export const validateMoreThan5 = (value) => {
  if (value) {
    if (value.length < 5) {
      return ' Must be longer than 5';
    }
  }
  return undefined;
};
