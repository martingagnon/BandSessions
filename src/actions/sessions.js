export const UPDATE_SESSIONS = 'UPDATE_SESSION';

export const updateSessions = (sessions) => {
  return {
    type: UPDATE_SESSIONS,
    sessions
  };
};
