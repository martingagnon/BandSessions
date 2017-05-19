import getBandsService from 'services/firebase/bands';
import getBandService from 'services/firebase/band';
import getMemberService from 'services/firebase/member';

export const UPDATE_BANDS = 'UPDATE_BANDS';
export const BAND_CREATED = 'BAND_CREATED';
export const NEW_BAND = 'NEW_BAND';

const bandCreated = (band) => ({type: BAND_CREATED, band});

export const updateBands = (bands) => {
  return {
    type: UPDATE_BANDS,
    bands
  };
};

export const newBand = () => {
  return {type: NEW_BAND};
};

export const addBand = (name) => {
  return (dispatch, getState) => {
    const addedBandId = getBandsService().add({name});

    const {currentUser} = getState().currentUser;
    getMemberService(addedBandId, currentUser.id).set({role: 'admin'});

    getBandService(addedBandId, (band) => dispatch(bandCreated(band))).observeOnce();
  };
};
