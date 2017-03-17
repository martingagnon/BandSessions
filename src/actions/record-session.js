export const RECORDING_STATE = 'RECORDING_STATE';
export const RECORDING_TIME = 'RECORDING_TIME';

export const recordingStates = {
  stopped: 0,
  recording: 1,
  paused: 2
};

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
