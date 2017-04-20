import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Sound from 'react-native-sound';
import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';
import {getTimeString} from 'services/utils';

import {View, Text, Slider} from 'react-native';
import Comments from './comments';
import styles from './styles';

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

  sliderChanged() {
    if (!this.state.stateBeforeDrag) {
      this.setState({...this.state, stateBeforeDrag: this.props.playerState});
    }
    this.props.setPlayerState(PlayerStates.paused);
  }

  slidingComplete(value) {
    if (this.state.stateBeforeDrag === PlayerStates.playing) {
      this.props.setPlayerState(PlayerStates.playing);
    }
    this.props.setPlayerTime(value);
    this.state.sound.setCurrentTime(value);
    this.setState({...this.state, stateBeforeDrag: null});
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
        <Slider value={currentTime}
          minimumValue={0}
          maximumValue={playerDuration}
          onValueChange={(value) => this.sliderChanged(value)}
          onSlidingComplete={(value) => this.slidingComplete(value)}
          />
        <Comments session={this.props.session}/>
        <View style={styles.time}>
          <Text>{getTimeString(currentTime)}</Text><Text>{getTimeString(playerDuration | 0)}</Text>
        </View>
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
