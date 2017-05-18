import {
  SESSION_UPLOAD_UNSTARTED,
  SESSION_UPLOAD_PENDING,
  SESSION_UPLOAD_PROGRESS,
  SESSION_UPLOAD_COMPLETED,
  SESSION_UPLOAD_ERROR
} from 'actions/sessions';

import fileTransferStates from 'constants/file-transfer-states';

const initialState = {
  saveState: fileTransferStates.unstarted,
  progress: 0
};

export default function addSession(state = initialState, action) {
  switch (action.type) {
    case SESSION_UPLOAD_UNSTARTED:
      return {...state, transferState: fileTransferStates.unstarted};
    case SESSION_UPLOAD_PENDING:
      return {...state, transferState: fileTransferStates.pending};
    case SESSION_UPLOAD_PROGRESS:
      return {...state, progress: action.progress};
    case SESSION_UPLOAD_COMPLETED:
      return {...state, progress: 1, transferState: fileTransferStates.completed};
    case SESSION_UPLOAD_ERROR:
      return {...state, transferState: fileTransferStates.error, error: action.error};
    default:
      return state;
  }
}
