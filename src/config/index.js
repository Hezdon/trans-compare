import Axios from "axios";
import { baseURL } from "./config.json";

const axios = Axios.create({
  baseURL
});

axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "multipart/form-data";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
