import React from "react";
import { useQuery } from "@tanstack/react-query";

const useFetchUsers = (seller = false, user = false) => {
  const getAllUser = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        return filterUser(filerSeller(data.data.users));
      });
  };

  // filter seller
  const filerSeller = (users) => {
    if (seller) return users.filter((user) => user.role === "seller");
    return users;
  };

  // filter user
  const filterUser = (users) => {
    if (user) return users.filter((user) => user.role === "user");
    return users;
  };

  const { data: users, isLoading } = useQuery(["allUsers"], getAllUser);

  return [users, isLoading];
};

export default useFetchUsers;
