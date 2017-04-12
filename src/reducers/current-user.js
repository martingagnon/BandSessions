import {CURRENT_USER} from 'actions/current-user';

const initialState = {
  currentUser: {}
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {...state, currentUser: action.currentUser};
    default:
      return state;
  }
}
