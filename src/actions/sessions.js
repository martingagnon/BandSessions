export const ADD_SESSION = 'ADD_SESSION';
export const UPDATE_SESSIONS = 'UPDATE_SESSION';

export const addSession = (sessionName) => {
  return {
    type: ADD_SESSION,
    sessionName
  };
};

export const updateSessions = (sessions) => {
  return {
    type: UPDATE_SESSIONS,
    sessions
  };
};
