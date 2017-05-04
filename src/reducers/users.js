import { UPDATE_USERS } from 'actions/members';

const initialState = {users: {}};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERS:
      const newUsers = action.users.reduce((users, user) => Object.assign(users, {[user.id]: user}), {});
      const newState = {...state, users: Object.assign(state.users, newUsers)};
      return newState;
    default:
      return state;
  }
}
