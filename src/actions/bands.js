import RNFetchBlob from 'react-native-fetch-blob';
import * as database from 'services/firebase/firebase';
import getBandsService from 'services/firebase/bands';
import getBandService from 'services/firebase/band';
import getMemberService from 'services/firebase/member';

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
/*eslint-disable */
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
/*eslint-enable */

export const UPDATE_BANDS = 'UPDATE_BANDS';
export const BAND_CREATED = 'BAND_CREATED';
export const NEW_BAND = 'NEW_BAND';

const bandCreated = (band) => ({type: BAND_CREATED, band});

const uploadBandImage = async (bandId, bandPicture) => {
  const pictureFile = bandPicture.replace('file:///', '/');
  const mime = 'image/jpeg';
  const storagePath = `bands2/${bandId}.jpg`;
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
    getBandService(bandId).update({picture})
  });
};

export const updateBands = (bands) => {
  return {
    type: UPDATE_BANDS,
    bands
  };
};

export const newBand = () => {
  return {type: NEW_BAND};
};

export const addBand = (name, bandPicture) => {
  return async (dispatch, getState) => {
    const addedBandId = getBandsService().add({name});

    const {currentUser} = getState().currentUser;
    getMemberService(addedBandId, currentUser.id).set({role: 'admin'});

    if (bandPicture) {
      await uploadBandImage(addedBandId, bandPicture)
    }

    getBandService(addedBandId, (band) => dispatch(bandCreated(band))).observeOnce();
  };
};
