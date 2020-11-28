import axios from 'axios';
import { Dispatch } from 'redux';

import {
  addReviewQuoteEndpointType,
  CoursesEndpointType,
  LoginEndpointType,
  ReviewQuotesEndpointType,
} from '../../constants/urls';
import {
  AlertTypeOptions,
  axiosMethodEnum,
  CourseType,
  ReviewQuoteDisplayType,
  ReviewQuoteType,
  UserLoginDataType,
  UserType,
} from '../../types';
import { clearLoading, setAlert, setLoading } from '../actions';

type getMethod = axiosMethodEnum.GET;
type postMethod = axiosMethodEnum.POST;

// TODO: this seems excessive. Is there a better way?
function callServer(dispatch: Dispatch,
  axiosArgs: { url: ReviewQuotesEndpointType; method: getMethod }
  ): Promise<ReviewQuoteDisplayType[] | null>;
function callServer(dispatch: Dispatch,
  axiosArgs: { url: CoursesEndpointType; method: getMethod }
  ): Promise<CourseType[] | null>;
function callServer(dispatch: Dispatch,
  axiosArgs: { url: LoginEndpointType; method: postMethod; data: UserLoginDataType }
  ): Promise<UserType | null>;
function callServer(dispatch: Dispatch,
  axiosArgs: { url: addReviewQuoteEndpointType; method: postMethod; data: ReviewQuoteType }
  ): Promise<ReviewQuoteDisplayType | null>;
async function callServer(dispatch, axiosArgs) {
  let responseData = null;
  const errorString = 'There was a problem connecting to the server';

  console.log('_#_#_#_#_#_#_#__#_# sending data', axiosArgs.data);

  if (process.env.NODE_ENV === 'development') {
    // for development, use flask server running in background
    // eslint-disable-next-line no-param-reassign
    axiosArgs.url = `http://localhost:5050${axiosArgs.url}`;
  }

  // start loading spinner
  dispatch(setLoading());

  try {
    // make server call
    const response = await axios({ ...axiosArgs, headers: { 'Content-Type': 'application/json' } });
    responseData = response?.data;
  } catch (e) {
    // TODO: log this to file
    // display error if needed
    dispatch(setAlert(errorString, AlertTypeOptions.error));
  }

  // clear loading spinner
  dispatch(clearLoading());

  // return data
  return responseData;
}

const useAxios = () => callServer;

export default useAxios;
