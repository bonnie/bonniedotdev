import axios from 'axios';
require('dotenv');

export default axios.create({
  baseURL: process.env.REST_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
