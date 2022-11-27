export const getUserByEmail = async (email) => {
  const result = await fetch(
    `${process.env.REACT_APP_API_URL}/users/email/${email}`
  );
  const data = await result.json();
  return data;
};

export const registerUser = async (userData) => {
  const result = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await result.json();
  return data;
};
