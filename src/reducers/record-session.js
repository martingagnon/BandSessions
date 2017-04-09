import { RECORDING_STATE, RECORDING_TIME} from 'actions/record-session';
import playerStates from 'constants/player-states';

const initialState = {
  recordingState: playerStates.stopped,
  time: 0
};

export default function recordSession(state = initialState, action) {
  switch (action.type) {
    case RECORDING_STATE:
      return {...state, recordingState: action.recordingState};
    case RECORDING_TIME:
      return {...state, time: action.time};
    default:
      return state;
  }
}
