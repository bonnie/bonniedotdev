import { Action } from 'redux';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
    url: string,
    id: number,
    method: axiosMethodOptions,
    updateStateAction: Action<any>,
    data?: any,
  }
}

export function editServerItem({ payload }:actionType) {
  // if id is negative, this is actually a new item
  const url = (payload.id < 0) ? payload.url : `${payload.url}/${payload.id}`;

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url,
      method: payload.method,
      data: payload.data,
      callback: () => payload.updateStateAction,
    },
  };
}

export default editServerItem;
