import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PlayerStates from 'constants/player-states';
import * as Actions from 'actions/player';

import {View, Text, Slider, StyleSheet} from 'react-native';
import Comments from './comments';
import colors from 'components/colors';

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
        <Comments session={this.props.session}/>
        <Slider value={currentTime}
          minimumValue={0}
          maximumValue={playerDuration}
          onValueChange={(value) => this.sliderChanged(value)}
          onSlidingComplete={(value) => this.slidingComplete(value)}
          />
          <View style={styles.time}>
            <Text style={styles.timeValue}>{getTimeString(currentTime)}</Text><Text style={styles.timeValue}>{getTimeString(playerDuration | 0)}</Text>
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

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeValue: {
    fontFamily: 'OpenSans',
    fontSize: 15,
    color: colors.barney
  }
});

export default connect(
  state => (state.player),
  dispatch => bindActionCreators(Actions, dispatch))(Player);
