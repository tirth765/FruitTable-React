import axios from "axios";
import { BASE_URL } from "./Base";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(function (response) {
  return response;

}, async function (error) {
  try {

    if (error.response && error.response.status === 401) {

      console.log("req for token");
      

      await axios.get(BASE_URL + "users/generateNewTokens", { withCredentials: true })

      return axiosInstance(error.config)
    }
  } catch (error) {
    console.log("error in req token");
    
    return Promise.reject(error);
  }
  return Promise.reject(error);
});