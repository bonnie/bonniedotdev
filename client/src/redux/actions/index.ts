import urls from '../../constants/urls';
import {
  AlertActionType,
  AlertTypeOptions,
  CoursesActionType,
  CourseType,
  LoadingActionType,
  ReviewQuoteDisplayType,
  ReviewQuotesActionType,
  UserActionType,
  UserType,
} from '../../types';

export const actionIds = {
  SET_ALERT: 'SET_ALERT',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_COURSES: 'SET_COURSES',
  SET_REVIEW_QUOTES: 'SET_REVIEW_QUOTES',
  SERVER_REQUEST: 'SERVER_REQUEST',
  LOGIN_USER: 'LOGIN_USER',
  SET_DATA_FROM_SERVER: 'SET_DATA_FROM_SERVER',
  DELETE_SERVER_ITEM: 'DELETE_SERVER_ITEM',
  EDIT_SERVER_ITEM: 'EDIT_SERVER_ITEM',
  ADD_SERVER_ITEM: 'ADD_SERVER_ITEM',
  UPDATE_SERVER_ITEM: 'UPDATE_SERVER_ITEM',
};

export function setAlert(message: string, alertType: AlertTypeOptions): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
    payload: { message, alertType },
  };
}

export function clearAlert(): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
  };
}

export function setLoading(): LoadingActionType {
  return {
    type: actionIds.SET_LOADING,
    payload: true,
  };
}

export function clearLoading(): LoadingActionType {
  return {
    type: actionIds.SET_LOADING,
    payload: false,
  };
}

export function setUser(userData: UserType): UserActionType {
  return {
    type: actionIds.SET_USER,
    payload: userData,
  };
}

export function clearUser(): UserActionType {
  return {
    type: actionIds.SET_USER,
  };
}

export function setCourses(payload: CourseType[]): CoursesActionType {
  return {
    type: actionIds.SET_COURSES,
    payload,
  };
}

export function setReviewQuotes(payload: ReviewQuoteDisplayType[]): ReviewQuotesActionType {
  return {
    type: actionIds.SET_REVIEW_QUOTES,
    payload,
  };
}

export function setCoursesFromServer() {
  return {
    type: actionIds.SET_DATA_FROM_SERVER,
    payload: {
      url: urls.coursesURL,
      callback: setCourses,
    },
  };
}

export function setReviewQuotesFromServer() {
  return {
    type: actionIds.SET_DATA_FROM_SERVER,
    payload: {
      url: urls.reviewQuotesURL,
      callback: (data) => {
        data.sort((a, b) => a.body.length - b.body.length);
        setReviewQuotes(data);
      },
    },
  };
}
