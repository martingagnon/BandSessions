import { SET_BAND } from 'actions/band';

const initialState = {band: null};

export default function bands(state = initialState, action) {
  switch (action.type) {
    case SET_BAND:
      return {...state, band: action.band};
    default:
      return state;
  }
}
