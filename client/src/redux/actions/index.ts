import axios from 'axios';

import { ErrorActionType, LoadingActionType, UserActionType } from '../../types';

export const actionTypes = {
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
};

export function setError(error: string): ErrorActionType {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
}

export function clearError(): ErrorActionType {
  return {
    type: actionTypes.SET_ERROR,
    payload: null,
  };
}

export function setLoading(): LoadingActionType {
  return {
    type: actionTypes.SET_LOADING,
    payload: true,
  };
}

export function clearLoading(): LoadingActionType {
  return {
    type: actionTypes.SET_LOADING,
    payload: false,
  };
}

export function setUser(username: string, password: string): UserActionType {
  return {
    type: actionTypes.SET_USER,
    // TODO: actually set the
    payload: null,
  };
}

export function clearUser(): UserActionType {
  return {
    type: actionTypes.SET_USER,
    payload: null,
  };
}

/* generic function to get data from server, setting loading and error state appropriately */
export async function getDataFromServer(
  endpoint: string,
  setData: (JSON) => void,
): Promise<void> {
  // TODO: update using React saga
  /*
  const errorString = 'There was a problem retrieving data from the server';
  setLoading();

  try {
    const response = await axios.get(endpoint);
    if (response.status >= 200 && response.status < 300) {
      setData(response.data);
    } else {
      // TODO: log this
      setError(errorString);
    }
  } catch {
    // TODO: log this
    setError(errorString);
  }
  clearLoading();
  */
  return Promise.resolve();
}
