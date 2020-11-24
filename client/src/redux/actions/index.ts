import {
  CoursesActionType,
  CourseType,
  ErrorActionType,
  LoadingActionType,
  ReviewQuoteDisplayType,
  ReviewQuotesActionType,
  UserActionType,
} from '../../types';

export const actionTypes = {
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_COURSES: 'SET_COURSES',
  SET_REVIEW_QUOTES: 'SET_REVIEW_QUOTES',
  GET_DATA_FROM_SERVER: 'GET_DATA_FROM_SERVER',
  SET_COURSES_FROM_SERVER: 'SET_COURSES_FROM_SERVER',
  SET_REVIEW_QUOTES_FROM_SERVER: 'SET_REVIEW_QUOTES_FROM_SERVER',
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

export function setReviewQuotes(payload: ReviewQuoteDisplayType[]): ReviewQuotesActionType {
  return {
    type: actionTypes.SET_REVIEW_QUOTES,
    payload,
  };
}
