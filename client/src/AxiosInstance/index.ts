import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {};

if (process.env.NODE_ENV === 'development')
  config.baseURL = 'http://localhost:5050';

const instance = axios.create(config);

export default instance;
