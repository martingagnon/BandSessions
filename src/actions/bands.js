import {getBandsService} from 'services/bands';

export const UPDATE_BANDS = 'UPDATE_BANDS';
export const ADD_BAND = 'ADD_BAND';

export const updateBands = (bands) => {
  return {
    type: UPDATE_BANDS,
    bands
  };
};

export const addBand = (name) => {
  return () => {
    getBandsService().add({name});
  };
};
