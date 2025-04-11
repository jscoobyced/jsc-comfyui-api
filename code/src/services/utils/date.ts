export const getCurrentDate = () => {
  return new Date().toISOString().substring(0, 19);
};
