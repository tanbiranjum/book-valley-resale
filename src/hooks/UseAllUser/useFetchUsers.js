import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/api";
import { getTokenFromLocalStorage } from "../../utils/utils";

const useFetchUsers = (seller = false, user = false) => {
  const getAllUser = async () => {
    return API(getTokenFromLocalStorage())
      .get(`/users`)
      .then((res) => filterUser(filterSeller(res.data.data.users)));
  };

  // filter seller
  const filterSeller = (users) => {
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
