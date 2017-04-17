import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import Slider from 'react-native-slider';
import Sound from 'react-native-sound';

import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';

import {Button} from 'nachos-ui';
import {Row} from 'ui';
import {styles} from './styles';

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

  nextActionIsPlay() {
    return (this.props.playerState === PlayerStates.paused || this.props.playerState === PlayerStates.stopped);
  }

  render() {
    const {duration, sound} = this.state;
    const {currentTime, playerState} = this.props;
    sound.getCurrentTime((_, playing) => {
      if (playing && playerState === PlayerStates.paused) {
        sound.pause();
      } else if (!playing && playerState === PlayerStates.playing) {
        sound.play();
        this.playerLoop();
      }
    });
    const playIconName = this.nextActionIsPlay() ? 'ios-play' : 'ios-pause';

    return (
      <View>
        <Slider value={Math.round(currentTime)} maximumValue={Math.round(duration) | 0} onValueChange={(value) => this.sliderChanged(value)} />
        <Text>Time: {Math.round(currentTime)}</Text><Text>Duration: {Math.round(duration | 0)}</Text>
        <Row>
          <View style={styles.toolbarItem}><Button kind="squared" iconName="ios-arrow-back"/></View>
          <View style={styles.toolbarItem}><Button kind="squared" iconName={playIconName} onPress={() => this.togglePlayPause()}/></View>
          <View style={styles.toolbarItem}><Button kind="squared" iconName="ios-arrow-forward"/></View>
          <View style={styles.toolbarItem}><Button kind="squared" iconName="ios-chatbubbles" onPress={this.props.addComment}/></View>
        </Row>
      </View>
    );
  }
}

Player.propTypes = {
  audioPath: PropTypes.string.isRequired,
  setPlayerTime: PropTypes.func.isRequired,
  setPlayerState: PropTypes.func.isRequired,
  playerState: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(
  state => (state.player),
  dispatch => bindActionCreators(Actions, dispatch))(Player);
