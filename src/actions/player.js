export const PLAYER_TIME = 'PLAYER_TIME';
export const PLAYER_STATE = 'PLAYER_STATE';
export const PLAYER_DURATION = 'PLAYER_DURATION';

export const setPlayerTime = (currentTime) => ({type: PLAYER_TIME, currentTime});
export const setPlayerState = (playerState) => ({type: PLAYER_STATE, playerState});
export const setPlayerDuration = (duration) => ({type: PLAYER_DURATION, duration});
