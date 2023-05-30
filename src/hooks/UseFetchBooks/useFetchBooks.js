import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import API from "../../api/api";

const queryBuilder = (category, condition, sort) => {
  const searchParams = new URLSearchParams();
  if (category) {
    searchParams.append("category", category);
  }
  if (condition) {
    searchParams.append("condition", condition);
  }
  if (sort) {
    searchParams.append("sort", sort);
  }
  return searchParams.toString();
};

const useFetchBooks = (query = {}) => {
  const [category, setCategory] = useState(query?.category || "");
  const [condition, setCondition] = useState(query?.condition || "");
  const [sort, setSort] = useState(query?.sort || "");

  console.log("Hello", category, query);
  const fetchBooks = async () => {
    const result = await API().get(
      `/books?${queryBuilder(category, condition, sort)}`
    );
    return result.data.data.books;
  };

  const { data, isLoading } = useQuery(
    ["books", category, condition, sort],
    fetchBooks,
    {
      cacheTime: 50000,
    }
  );

  return { data, isLoading, setCategory, setCondition, setSort, condition };
};

export default useFetchBooks;
