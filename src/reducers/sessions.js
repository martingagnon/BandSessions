import { UPDATE_SESSIONS } from 'actions/sessions';

const initialState = {sessions: {}};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSIONS:
      const bandId = action.bandId;
      const sessions = action.sessions;
      return {...state, sessions: {...state.sessions, [bandId]: sessions}};
    default:
      return state;
  }
}
