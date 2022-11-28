import axios from "axios";
import jwt_decode from "jwt-decode";

const API = (token) => {
  return axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      authorization: `Bearer ${token}`,
      role: token ? jwt_decode(token).role : "",
    },
  });
};

export default API;
