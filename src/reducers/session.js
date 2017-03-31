import {
  SESSION_DOWNLOAD_PENDING,
  SESSION_DOWNLOAD_PROGRESS,
  SESSION_DOWNLOAD_COMPLETED,
  SESSION_DOWNLOAD_ERROR
} from 'actions/session';

import fileTransferStates from 'constants/file-transfer-states';

const initialState = {
  transferState: fileTransferStates.unstarted,
  progress: 0
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case SESSION_DOWNLOAD_PENDING:
      return {...state, transferState: fileTransferStates.pending};
    case SESSION_DOWNLOAD_PROGRESS:
      return {...state, progress: action.progress};
    case SESSION_DOWNLOAD_COMPLETED:
      return {...state, progress: 100, transferState: fileTransferStates.completed};
    case SESSION_DOWNLOAD_ERROR:
      return {...state, transferState: fileTransferStates.error, error: action.error};
    default:
      return state;
  }
}
