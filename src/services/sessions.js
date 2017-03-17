import * as database from './firebase';
import RNFetchBlob from 'react-native-fetch-blob'

const sessionsRef = database.ref('sessions');
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const add = (object) => {
  sessionsRef.push(object);
};

export const observe = (callback) => {
  sessionsRef.on('value', (snap) => {
    const items = [];
    snap.forEach((child) => {
      items.push({
        name: child.val().name,
        audio: child.val().audio,
        _key: child.key
      });
    });

    callback(items);
  });
};

export const upload = async (fileName) => {
  const mime = 'audio/aac';
  const time = new Date().getTime();
  const storageFileRef = database.storageFile(`sessions/${time}.aac`);
  const data = await fs.readFile(fileName, 'base64');
  const uploadBlob = await Blob.build(data, { type: `${mime};BASE64` });
  await storageFileRef.put(uploadBlob, { contentType: mime });
  uploadBlob.close()
  const url = await storageFileRef.getDownloadURL();
  add({name: time, audio: url});
  return url;
}
