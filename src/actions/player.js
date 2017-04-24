import AudioPlayer from 'services/audio-player';
import PlayerStates from 'constants/player-states';

export const PLAYER_TIME = 'PLAYER_TIME';
export const PLAYER_STATE = 'PLAYER_STATE';
export const PLAYER_DURATION = 'PLAYER_DURATION';

const setTime = (currentTime) => ({type: PLAYER_TIME, currentTime});
const setPlayerState = (playerState) => ({type: PLAYER_STATE, playerState});
const setPlayerDuration = (duration) => ({type: PLAYER_DURATION, duration});

const audioPlayer = new AudioPlayer();

export const preparePlayer = (audioPath) => {
  return (dispatch) => {
    audioPlayer.setOnDuration((duration) => dispatch(setPlayerDuration(duration)));
    audioPlayer.setOnState((state) => dispatch(setPlayerState(state)));
    audioPlayer.setOnTime((time) => dispatch(setTime(time)));

    audioPlayer.prepareAudio(audioPath);
  };
};

export const setPlayerTime = (time) => {
  return () => {
    audioPlayer.setTime(time);
    setTime(time);
  };
};

const PlayableStates = [PlayerStates.paused, PlayerStates.stopped];
export const play = () => {
  return (_, getState) => {
    const {playerState} = getState().player;
    if (PlayableStates.includes(playerState)) {
      audioPlayer.play();
    }
  };
};

const PausableStates = [PlayerStates.playing];
export const pause = () => {
  return (_, getState) => {
    const {playerState} = getState().player;
    if (PausableStates.includes(playerState)) {
      audioPlayer.pause();
    }
  };
};

export const stop = () => {
  return () => {
    audioPlayer.stop();
  };
};
