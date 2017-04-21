import Sound from 'react-native-sound';

import PlayerStates from 'constants/player-states';

export default class AudioPlayer {
  prepareAudio(audioPath) {
    this.dispatchState(PlayerStates.loading);
    this.sound = new Sound(audioPath, '', (error) => {
      if (error) {
        this.dispatchState(PlayerStates.error);
      } else {
        this.dispatchDuration(this.sound.getDuration());
        this.dispatchState(PlayerStates.stopped);
      }
    });
  }

  stop() {
    if (this.sound) {
      this.sound.stop();
    }
  }

  setOnDuration(callback) {
    this.onDuration = callback;
  }

  dispatchDuration(duration) {
    if (this.onDuration) this.onDuration(duration);
  }

  setOnState(callback) {
    this.onState = callback;
  }

  dispatchState(state) {
    if (this.onState) this.onState(state);
  }

  setOnTime(callback) {
    this.onTime = callback;
  }

  dispatchTime(time) {
    if (this.onTime) this.onTime(time);
  }

  setTime(time) {
    if (this.sound) this.sound.setCurrentTime(time);
  }

  play() {
    if (this.sound) {
      this.sound.play();
      this.dispatchState(PlayerStates.playing);
      this.playerLoop();
    }
  }

  pause() {
    if (this.sound) {
      this.sound.pause();
      this.dispatchState(PlayerStates.paused);
    }
  }

  stop() {
    if (this.sound) {
      this.sound.stop();
      this.dispatchState(PlayerStates.stopped);
    }
  }

  playerLoop() {
    const player = this;
    const {sound} = this;
    sound.getCurrentTime((currentTime, playing) => {
      if (playing) {
        player.dispatchTime(currentTime);
        setTimeout(() => player.playerLoop(player), 100);
      }
    });
  }
}
