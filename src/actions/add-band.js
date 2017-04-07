export const ADD_BAND = 'ADD_BAND';

import {bandService} from 'services/bands';

export const addBand = (name) => {
  return async () => {
    bandService.add({name});
  };
};
