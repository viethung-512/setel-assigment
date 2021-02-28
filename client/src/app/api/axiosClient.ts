import axios from 'axios';
import queryString from 'query-string';

const baseURL = process.env.REACT_APP_BASE_API_URL;

console.log({ baseURL });

const axiosClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (
      response &&
      response.data &&
      (response.data.status === 200 || response.data.status === 201)
    ) {
      return response.data.data;
    }

    return response;
  },
  error => {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errors
    ) {
      throw error.response.data.errors;
    }

    throw error;
  }
);

export default axiosClient;
