import axios from "axios";

// Create the first instance
const commonAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default commonAxios;
