import RNFetchBlob from 'react-native-fetch-blob';

export const SESSION_DOWNLOAD_PENDING = 'SESSION_DOWNLOAD_PENDING';
export const SESSION_DOWNLOAD_PROGRESS = 'SESSION_DOWNLOAD_PROGRESS';
export const SESSION_DOWNLOAD_COMPLETED = 'SESSION_DOWNLOAD_COMPLETED';
export const SESSION_DOWNLOAD_ERROR = 'SESSION_DOWNLOAD_ERROR';

const downloadPending = () => ({type: SESSION_DOWNLOAD_PENDING});
const downloadCompleted = (filePath) => ({type: SESSION_DOWNLOAD_COMPLETED, filePath});
const downloadProgress = (progress) => ({type: SESSION_DOWNLOAD_PROGRESS, progress});
const downloadError = (error) => ({type: SESSION_DOWNLOAD_ERROR, error});

export const downloadSession = (session) => {
  return async (dispatch) => {
    dispatch(downloadPending());
    try {
      const response = await RNFetchBlob.config({fileCache: true}).fetch('GET', session.audio).progress((received, total) => {
        dispatch(downloadProgress(received / total));
      });
      const filePath = response.path();
      dispatch(downloadCompleted(filePath));
    } catch (error) {
      dispatch(downloadError(error));
    }
  };
};
