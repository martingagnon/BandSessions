import RNFetchBlob from 'react-native-fetch-blob';
import * as database from 'services/firebase/firebase';
import getSessionsService from 'services/firebase/sessions';

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const SESSION_UPLOAD_UNSTARTED = 'SESSION_UPLOAD_UNSTARTED';
export const SESSION_UPLOAD_PENDING = 'SESSION_UPLOAD_PENDING';
export const SESSION_UPLOAD_PROGRESS = 'SESSION_UPLOAD_PROGRESS';
export const SESSION_UPLOAD_COMPLETED = 'SESSION_UPLOAD_COMPLETED';
export const SESSION_UPLOAD_ERROR = 'SESSION_UPLOAD_ERROR';
export const UPDATE_SESSIONS = 'UPDATE_SESSION';

const uploadPending = () => ({type: SESSION_UPLOAD_PENDING});
const uploadCompleted = (session) => ({type: SESSION_UPLOAD_COMPLETED, session});
const uploadProgress = (progress) => ({type: SESSION_UPLOAD_PROGRESS, progress});
const uploadError = (error) => ({type: SESSION_UPLOAD_ERROR, error});

export const uploadUnstarted = () => ({type: SESSION_UPLOAD_UNSTARTED});

export const addSession = (bandId, file, session) => {
  return async (dispatch) => {
    dispatch(uploadPending());

    const mime = 'audio/aac';
    const time = new Date().getTime();
    const storageFileRef = database.storageFile(`sessions/${time}.aac`);
    const data = await fs.readFile(file, 'base64');
    const uploadBlob = await Blob.build(data, { type: `${mime};BASE64` });

    const uploadTask = storageFileRef.put(uploadBlob, { contentType: mime });

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
      dispatch(uploadProgress(progress));
    }, (error) => {
      dispatch(uploadError(error));
    }, async () => {
      uploadBlob.close();
      const audio = await storageFileRef.getDownloadURL();
      getSessionsService(bandId).add({...session, audio});
      dispatch(uploadProgress(1));
      dispatch(uploadCompleted());
    });
  };
};

export const updateSessions = (sessions, bandId) => {
  sessions.reverse();

  return {
    type: UPDATE_SESSIONS,
    sessions,
    bandId
  };
};
