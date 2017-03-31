import { RECORDING_STATE, RECORDING_TIME, recordingStates} from 'actions/record-session';

const initialState = {
  recordingState: recordingStates.stopped,
  time: 0
};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case RECORDING_STATE:
      return {...state, recordingState: action.recordingState};
    case RECORDING_TIME:
      return {...state, time: action.time};
    default:
      return state;
  }
}
