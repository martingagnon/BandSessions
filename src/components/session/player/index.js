import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, Slider} from 'react-native';

import Comments from './comments';
import styles from './styles'

import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';

import {getTimeString} from 'services/utils';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.preparePlayer(this.props.audioPath);
  }

  componentWillUnmount() {
    this.props.stop();
  }

  sliderChanged() {
    if (!this.state.stateBeforeDrag) {
      this.setState({...this.state, stateBeforeDrag: this.props.playerState});
    }
    this.props.pause();
  }

  slidingComplete(value) {
    this.props.setPlayerTime(value);
    if (this.state.stateBeforeDrag === PlayerStates.playing) {
      this.props.play();
    }
    this.setState({...this.state, stateBeforeDrag: null});
  }

  render() {
    const {playerDuration, currentTime} = this.props;

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
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  preparePlayer: PropTypes.func.isRequired,
  playerState: PropTypes.number.isRequired,
  playerDuration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  session: PropTypes.object.isRequired
};

export default connect(
  state => (state.player),
  dispatch => bindActionCreators(Actions, dispatch))(Player);
