export const SAVING_SESSION = 'SAVING_SESSION';

export const saveSession = (session) => {
  return {
    type: SAVING_SESSION,
    session
  };
};
