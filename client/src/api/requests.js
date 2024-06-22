import axios from 'axios';

export const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error.response, null]
);
