import {
  CoursesActionType, CourseType, ErrorActionType, LoadingActionType, UserActionType,
} from '../../types';

export const actionTypes = {
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_COURSES: 'SET_COURSES',
  GET_DATA_FROM_SERVER: 'GET_DATA_FROM_SERVER',
  SET_COURSES_FROM_SERVER: 'SET_COURSES_FROM_SERVER',
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
    // TODO: actually set the payload
    payload: { username, password },
  };
}

export function clearUser(): UserActionType {
  return {
    type: actionTypes.SET_USER,
  };
}

export function setCourses(payload: CourseType[]): CoursesActionType {
  return {
    type: actionTypes.SET_COURSES,
    payload,
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
