import RNFetchBlob from 'react-native-fetch-blob';

export const SESSION_DOWNLOAD_PENDING = 'SESSION_DOWNLOAD_PENDING';
export const SESSION_DOWNLOAD_PROGRESS = 'SESSION_DOWNLOAD_PROGRESS';
export const SESSION_DOWNLOAD_COMPLETED = 'SESSION_DOWNLOAD_COMPLETED';
export const SESSION_DOWNLOAD_ERROR = 'SESSION_DOWNLOAD_ERROR';

const downloadPending = () => ({type: SESSION_DOWNLOAD_PENDING});
const downloadCompleted = (audioPath) => ({type: SESSION_DOWNLOAD_COMPLETED, audioPath});
const downloadProgress = (progress) => ({type: SESSION_DOWNLOAD_PROGRESS, progress});
const downloadError = (error) => ({type: SESSION_DOWNLOAD_ERROR, error});

export const downloadSession = (session) => {
  return async (dispatch) => {
    dispatch(downloadProgress(0));
    dispatch(downloadPending());
    const {dirs} = RNFetchBlob.fs;
    const path = `${dirs.CacheDir}/${session.id}`;

    try {
      const exists = await RNFetchBlob.fs.exists(path);

      if (!exists) {
        await RNFetchBlob.config({path}).fetch('GET', session.audio).progress((received, total) => {
          dispatch(downloadProgress(received / total));
        });
      }

      dispatch(downloadCompleted(path));
      downloadProgress(1);
    } catch (error) {
      dispatch(downloadError(path));
    }
  };
};
