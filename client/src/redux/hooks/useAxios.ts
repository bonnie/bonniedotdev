import axios from 'axios';
import { Dispatch } from 'redux';

import {
  CoursesEndpointType,
  LoginEndpointType,
  ReviewQuotesEndpointType,
} from '../../constants/urls';
import {
  axiosMethodEnum, CourseType, ReviewQuoteDisplayType, UserType,
} from '../../types';
import { clearLoading, setError, setLoading } from '../actions';

type getMethod = axiosMethodEnum.GET;

// TODO: this seems excessive. Is there a better way?
function callServer(dispatch: Dispatch,
  axiosArgs: { url: ReviewQuotesEndpointType; method: getMethod }
  ): Promise<ReviewQuoteDisplayType[] | null>;
function callServer(dispatch: Dispatch,
  axiosArgs: { url: CoursesEndpointType; method: getMethod }
  ): Promise<CourseType[] | null>;
function callServer(dispatch: Dispatch,
  axiosArgs: { url: LoginEndpointType; method: getMethod }
  ): Promise<UserType | null>;
async function callServer(dispatch,
  axiosArgs) {
  let responseData = null;
  const errorString = 'There was a problem connecting to the server';

  if (process.env.NODE_ENV === 'development') {
    // for development, use flask server running in background
    // eslint-disable-next-line no-param-reassign
    axiosArgs.url = `http://localhost:5000${axiosArgs.url}`;
  }

  // start loading spinner
  dispatch(setLoading());

  try {
    // make server call
    const response = await axios(axiosArgs);
    responseData = response?.data;
  } catch (e) {
    // TODO: log this to file
    console.log('server connection failed:', e);

    // display error if needed
    dispatch(setError(errorString));
  }

  // clear loading spinner
  dispatch(clearLoading());

  // return data
  return responseData;
}

const useAxios = () => callServer;

export default useAxios;
