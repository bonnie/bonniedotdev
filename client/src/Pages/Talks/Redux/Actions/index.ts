/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import jiff from 'jiff';
import sagaActionIds from 'State/Sagas/actionIds';
import { axiosMethodOptions } from 'State/Sagas/Types';
import _ from 'underscore';

import { TalkActionType, TalkType } from '../../Types';

export const actionIds = {
  SET_TALKS: 'SET_TALKS',
};

export function setTalks(payload: TalkType[]): TalkActionType {
  return {
    type: actionIds.SET_TALKS,
    payload,
  };
}

export function setTalksFromServer() {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      method: axiosMethodOptions.get,
      url: urls.talksURL,
      callback: setTalks,
    },
  };
}

export function deleteTalk(TalkId) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.talkURL}/${TalkId}`,
      method: axiosMethodOptions.delete,
      callback: setTalksFromServer,
    },
  };
}

export function addTalk(newData) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.talkURL,
      method: axiosMethodOptions.post,
      callback: setTalksFromServer,
      data: newData,
    },
  };
}

export function editTalk(newData, originalData) {
  // only deal with keys expected on the server
  const patchRelevantKeys = [
    'title',
    'utcDateStringISO',
    'description',
    'slidesFilename',
    'conferenceImageName',
    'conferenceName',
    'conferenceLink',
    'recordingLink',
  ];
  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jiff.diff(originalPatchData, newPatchData);

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.talkURL}/${newData.id}`,
      method: axiosMethodOptions.patch,
      callback: setTalksFromServer,
      data: patch,
    },
  };
}
