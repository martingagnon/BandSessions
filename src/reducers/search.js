import {USER_SEARCH_RESULTS} from 'actions/search-users';

const initialState = {
  users: []
};

export default function searchUsers(state = initialState, action) {
  switch (action.type) {
    case USER_SEARCH_RESULTS:
      return {...state, users: action.users};
    default:
      return state;
  }
}
