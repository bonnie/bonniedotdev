import { Action } from 'redux';

// TODO: can I import this?
export enum axiosMethodOptions {
  get = 'get',
  GET = 'GET',
  delete = 'delete',
  DELETE = 'DELETE',
  head = 'head',
  HEAD = 'HEAD',
  options = 'options',
  OPTIONS = 'OPTIONS',
  post = 'post',
  POST = 'POST',
  put = 'put',
  PUT = 'PUT',
  patch = 'patch',
  PATCH = 'PATCH',
  purge = 'purge',
  PURGE = 'PURGE',
  link = 'link',
  LINK = 'LINK',
  unlink = 'unlink',
  UNLINK = 'UNLINK',
}

export type axiosArgsType = {
  method: axiosMethodOptions;
  url: string;
  data?: any;
  callback?: (data) => Action<any>;
};
