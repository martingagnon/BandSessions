import { UPDATE_BANDS } from 'actions/bands';

const initialState = {bands: []};

export default function bands(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BANDS:
      return {...state, bands: action.bands};
    default:
      return state;
  }
}
