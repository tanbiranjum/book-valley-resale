export const setTokenInLocalStorage = (token) => {
  localStorage.setItem("book-valley-auth-token", token);
};

export const setUserIdInLocalStorage = (userId) => {
  localStorage.setItem("book-valley-user-id", userId);
};

export const removeUserIdFromLocalStorage = () => {
  localStorage.removeItem("book-valley-user-id");
};

export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("book-valley-user-id");
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("book-valley-auth-token");
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("book-valley-auth-token");
};
