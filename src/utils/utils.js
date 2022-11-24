export const setTokenInLocalStorage = (token) => {
  localStorage.setItem("book-valley-auth-token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("book-valley-auth-token");
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("book-valley-auth-token");
};
