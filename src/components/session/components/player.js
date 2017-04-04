import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import Slider from 'react-native-slider';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome';

import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';

class Player extends Component {
  constructor(props) {
    super(props);
    const sound = new Sound(props.audioPath, '', () => {});
    this.state = {position: 0, sound};
    this.waitReady(this);
  }

  componentWillUnmount() {
    const {sound} = this.state;
    sound.stop();
  }

  waitReady(player) {
    const {sound} = player.state;
    if (sound.isLoaded()) {
      const duration = sound.getDuration();
      player.setState({...player.state, duration});
      player.play();
    } else {
      setTimeout(() => player.waitReady(player), 100);
    }
  }

  playerLoop() {
    const player = this;
    const {sound} = player.state;
    sound.getCurrentTime((currentTime, playing) => {
      if (playing) {
        player.props.setPlayerTime(currentTime);
        setTimeout(() => player.playerLoop(player), 100);
      }
    });
  }

  sliderChanged(value) {
    this.state.sound.setCurrentTime(value);
  }

  play() {
    this.props.setPlayerState(PlayerStates.playing);
  }

  pause() {
    this.props.setPlayerState(PlayerStates.paused);
  }

  togglePlayPause() {
    if (this.props.playerState !== PlayerStates.paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  render() {
    const {duration, sound} = this.state;
    const {currentTime, playerState} = this.props;
    sound.getCurrentTime((_, playing) => {
      if (playing && this.props.playerState === PlayerStates.paused) {
        sound.pause();
      } else if (!playing && this.props.playerState === PlayerStates.playing) {
        sound.play();
        this.playerLoop();
      }
    });

    return (
      <View>
        <Slider value={Math.round(currentTime)} maximumValue={Math.round(duration) | 0} onValueChange={(value) => this.sliderChanged(value)} />
        <Text>Time: {Math.round(currentTime)}</Text><Text>Duration: {Math.round(duration | 0)}</Text>
        <Icon.Button name={playerState === PlayerStates.paused ? 'play' : 'pause'} backgroundColor="#3b5998" onPress={() => this.togglePlayPause()} />
      </View>
    );
  }
}

Player.propTypes = {
  audioPath: PropTypes.string.isRequired,
  setPlayerTime: PropTypes.func.isRequired,
  setPlayerState: PropTypes.func.isRequired,
  playerState: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired
};

export default connect(
  state => (state.player),
  dispatch => bindActionCreators(Actions, dispatch))(Player);
