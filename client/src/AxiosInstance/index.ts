import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {};

if (process.env.NODE_ENV === 'development')
  config.baseURL = 'http://localhost:5050';

// for canceling requests to avoid test errors
export const cancelTokenSource = axios.CancelToken.source();
if (process.env.NODE_ENV === 'test') {
  config.cancelToken = cancelTokenSource.token;
}

const instance = axios.create(config);

export default instance;
