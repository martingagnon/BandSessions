import getBandsService from 'services/bands';
import getBandService from 'services/band';

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
  return (dispatch) => {
    const addedBandId = getBandsService().add({name}).key;
    getBandService(addedBandId, (band) => dispatch(bandCreated(band))).observeOnce();
  };
};
