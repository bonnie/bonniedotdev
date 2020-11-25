import axios from 'axios';
import { Dispatch } from 'redux';

import { axiosArgsType, serverResponseType } from '../../types';
import { clearLoading, setError, setLoading } from '../actions';

const useAxios = () => async (
  dispatch: Dispatch,
  axiosArgs: axiosArgsType,
): Promise<serverResponseType> => {
  let responseData: serverResponseType = null;
  const errorString = 'There was a problem connecting to the server';

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
};

export default useAxios;
