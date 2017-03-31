import * as sessionsService from 'services/sessions';

export const RECORDING_STATE = 'RECORDING_STATE';
export const RECORDING_TIME = 'RECORDING_TIME';

export const setRecordingState = (recordingState) => {
  return {
    type: RECORDING_STATE,
    recordingState
  };
};

export const setRecordingTime = (time) => {
  return {
    type: RECORDING_TIME,
    time
  };
};

export const saveSession = (path) => {
  return () => {
    sessionsService.saveSession(path);
  };
};
