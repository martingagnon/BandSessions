import RNFetchBlob from 'react-native-fetch-blob';
import * as database from 'services/firebase/firebase';
import getBandService from 'services/firebase/band'

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
/*eslint-disable */
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
/*eslint-enable */

export const uploadBandImage = async (bandId, bandPicture) => {
  const pictureFile = bandPicture.replace('file:///', '/');
  const mime = 'image/jpeg';
  const storagePath = `bands/${bandId}.jpg`;
  const storageFileRef = database.storageFile(storagePath);

  const data = await fs.readFile(pictureFile, 'base64');
  const uploadBlob = await Blob.build(data, { type: `${mime};BASE64` });
  const uploadTask = storageFileRef.put(uploadBlob, { contentType: mime });

  uploadTask.on('state_changed', () => {
  }, (error) => {
    return error;
  }, async () => {
    uploadBlob.close();
    const picture = await storageFileRef.getDownloadURL();
    getBandService(bandId).update({picture});
  });
};
