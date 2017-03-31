export const PLAY_SESSION = 'PLAY_SESSION';

export const playSession = (session) => {
  return {
    type: PLAY_SESSION,
    session
  };
};
