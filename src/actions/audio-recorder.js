import * as audioRecorder from 'services/audio-recorder';
import playerStates from 'constants/player-states';

export const RECORDING_STATE = 'RECORDING_STATE';
export const RECORDING_TIME = 'RECORDING_TIME';
export const ADD_BOOKMARK = 'ADD_BOOKMARK';

const setRecordingState = (recordingState) => {
  return {
    type: RECORDING_STATE,
    recordingState
  };
};

const setRecordingTime = (time) => {
  return {
    type: RECORDING_TIME,
    time
  };
};

export const addBookmark = (time) => {
  return {
    type: ADD_BOOKMARK,
    time
  };
};

export const prepareRecording = (audioPath) => {
  return (dispatch) => {
    audioRecorder.prepareRecording(audioPath);
    dispatch(setRecordingTime(0));
    dispatch(setRecordingState(playerStates.stopped));
    audioRecorder.setOnProgress((data) => {
      dispatch(setRecordingTime(Math.floor(data.currentTime)));
    });
  };
};

export const stopRecording = () => {
  return async (dispatch) => {
    await audioRecorder.stop();
    dispatch(setRecordingState(playerStates.stopped));
  };
};

export const toggleRecordPause = () => {
  return async (dispatch, getState) => {
    const {recordingState} = getState().audioRecorder;

    switch (recordingState) {
      case playerStates.stopped:
      case playerStates.paused:
        await audioRecorder.record();
        dispatch(setRecordingState(playerStates.recording));
        break;
      case playerStates.recording:
        await audioRecorder.pause();
        dispatch(setRecordingState(playerStates.paused));
        break;
    }
  };
};
