import {
  SESSION_UPLOAD_PENDING,
  SESSION_UPLOAD_PROGRESS,
  SESSION_UPLOAD_COMPLETED,
  SESSION_UPLOAD_ERROR
} from 'actions/save-session';

import saveSessionStates from 'constants/save-session-states';

const initialState = {
  saveState: saveSessionStates.unstarted,
  progress: 0
};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case SESSION_UPLOAD_PENDING:
      return {...state, saveState: saveSessionStates.pending};
    case SESSION_UPLOAD_PROGRESS:
      return {...state, progress: action.progress};
    case SESSION_UPLOAD_COMPLETED:
      return {...state, progress: 100, saveState: saveSessionStates.completed};
    case SESSION_UPLOAD_ERROR:
      return {...state, saveState: saveSessionStates.error, error: action.error};
    default:
      return state;
  }
}
