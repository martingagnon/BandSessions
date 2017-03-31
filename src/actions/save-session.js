import * as database from './firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const sessionsRef = database.ref('sessions');

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

export const SESSION_UPLOAD_PENDING = 'SESSION_UPLOAD_PENDING';
export const SESSION_UPLOAD_PROGRESS = 'SESSION_UPLOAD_PROGRESS';
export const SESSION_UPLOAD_COMPLETED = 'SESSION_UPLOAD_COMPLETED';
export const SESSION_UPLOAD_ERROR = 'SESSION_UPLOAD_ERROR';

const uploadPending = () => ({type: SESSION_UPLOAD_PENDING});
const uploadCompleted = (session) => ({type: SESSION_UPLOAD_COMPLETED, session});
const uploadProgress = (progress) => ({type: SESSION_UPLOAD_PROGRESS, progress});
const uploadError = (error) => ({type: SESSION_UPLOAD_ERROR, error});

export const saveSession = (file, session) => {
  return async (dispatch) => {
    dispatch(uploadPending());

    const mime = 'audio/aac';
    const time = new Date().getTime();
    const storageFileRef = database.storageFile(`sessions/${time}.aac`);
    const data = await fs.readFile(file, 'base64');
    const uploadBlob = await Blob.build(data, { type: `${mime};BASE64` });

    const uploadTask = storageFileRef.put(uploadBlob, { contentType: mime });

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch(uploadProgress(progress));
    }, (error) => {
      dispatch(uploadError(error));
    }, async () => {
      dispatch(uploadCompleted());
      uploadBlob.close();
      const audio = await storageFileRef.getDownloadURL();
      sessionsRef.push({...session, audio});
    });
  };
};