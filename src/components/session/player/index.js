import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import Slider from 'react-native-slider';
import Sound from 'react-native-sound';
import Comments from './comments';

import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';

class Player extends Component {
  constructor(props) {
    super(props);
    const sound = new Sound(props.audioPath, '', () => {});
    this.state = {position: 0, sound};
  }

  componentDidMount() {
    this.waitReady(this);
  }

  componentWillUnmount() {
    const {sound} = this.state;
    sound.stop();
  }

  waitReady(player) {
    const {sound} = player.state;
    if (sound.isLoaded()) {
      player.props.setPlayerDuration(sound.getDuration());
      player.props.setPlayerState(PlayerStates.playing);
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

  render() {
    const {sound} = this.state;
    const {playerDuration, currentTime, playerState} = this.props;
    sound.getCurrentTime((_, playing) => {
      if (playing && playerState === PlayerStates.paused) {
        sound.pause();
      } else if (!playing && playerState === PlayerStates.playing) {
        sound.play();
        this.playerLoop();
      }
    });

    return (
      <View>
        <Slider value={Math.round(currentTime)} maximumValue={Math.round(playerDuration) | 0} onValueChange={(value) => this.sliderChanged(value)} />
        <Comments session={this.props.session}/>
        <Text>Time: {Math.round(currentTime)}</Text><Text>Duration: {Math.round(playerDuration | 0)}</Text>
      </View>
    );
  }
}

Player.propTypes = {
  audioPath: PropTypes.string.isRequired,
  setPlayerTime: PropTypes.func.isRequired,
  setPlayerDuration: PropTypes.func.isRequired,
  setPlayerState: PropTypes.func.isRequired,
  playerState: PropTypes.number.isRequired,
  playerDuration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  session: PropTypes.object.isRequired
};

export default connect(
  state => (state.player),
  dispatch => bindActionCreators(Actions, dispatch))(Player);
