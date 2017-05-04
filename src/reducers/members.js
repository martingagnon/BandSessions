import { UPDATE_MEMBERS } from 'actions/members';

const initialState = {members: {}};

export default function members(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MEMBERS:
      const bandId = action.bandId;
      const members = action.members;
      return {...state, members: {...state.members, [bandId]: members}};
    default:
      return state;
  }
}
