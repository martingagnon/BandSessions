import { UPDATE_BANDS, BAND_CREATED, NEW_BAND } from 'actions/bands';

const initialState = {bands: []};

export default function bands(state = initialState, action) {
  switch (action.type) {
    case BAND_CREATED:
      return {...state, lastCreatedBand: action.band};
    case NEW_BAND:
      return {...state, lastCreatedBand: undefined};
    case UPDATE_BANDS:
      return {...state, bands: action.bands};
    default:
      return state;
  }
}
