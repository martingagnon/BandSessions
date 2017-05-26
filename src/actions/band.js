import {uploadBandImage} from 'services/utils/band'
import getBandService from 'services/firebase/band'
import getMembersService from 'services/firebase/members'

export const SET_BAND = 'SET_BAND';

export const setBand = (band) => {
  return {
    type: SET_BAND,
    band
  };
};

export const updateBandImage = (band, bandPicture) => {
  return async () => {
    if (bandPicture) {
      await uploadBandImage(band.id, bandPicture);
    }
  }
}

export const updateBandName = (band, name) => {
  return async () => {
    if (name) {
      getBandService(band.id).update({name});
    }
  }
}

export const deleteBand = (band) => {
  return async () => {
    getBandService(band.id).remove();
    getMembersService(band.id).remove();
  }
}
