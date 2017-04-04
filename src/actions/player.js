export const PLAYER_TIME = 'PLAYER_TIME';
export const PLAYER_STATE = 'PLAYER_STATE';

export const setPlayerTime = (currentTime) => ({type: PLAYER_TIME, currentTime});
export const setPlayerState = (playerState) => ({type: PLAYER_STATE, playerState});
