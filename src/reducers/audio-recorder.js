import { RECORDING_STATE, RECORDING_TIME, ADD_BOOKMARK} from 'actions/audio-recorder';
import playerStates from 'constants/player-states';

const initialState = {
  recordingState: playerStates.stopped,
  time: 0,
  bookmarks: []
};

export default function audioRecorder(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {...state, bookmarks: state.bookmarks.concat([action.time])}
    case RECORDING_STATE:
      return {...state, recordingState: action.recordingState};
    case RECORDING_TIME:
      return {...state, time: action.time};
    default:
      return state;
  }
}
