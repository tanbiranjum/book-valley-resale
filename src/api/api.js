import axios from "axios";
import jwt_decode from "jwt-decode";

const API = (token) => {
  return axios.create({
    // baseURL: "https://book-valley-server-tanbiranjum.vercel.app/api/v1",
    baseURL: "http://127.0.0.1:5000/api/v1",
    headers: {
      authorization: `Bearer ${token}`,
      role: token ? jwt_decode(token).role : "",
    },
  });
};

export default API;
