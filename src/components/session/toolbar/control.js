import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';

import PlayerStates from 'constants/player-states';

import {View, StyleSheet} from 'react-native';
import {Button} from 'nachos-ui';

import colors from 'components/colors';

const SECONDS_COMMENT = 5;

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const comments = nextProps.comments[nextProps.session.id] || [];
    comments.sort((commentA, commentB) => commentA.time - commentB.time);
    const nextComment = comments.find((comment) => comment.time > (nextProps.currentTime + SECONDS_COMMENT + 1));
    const previousComment = comments.concat([]).reverse().find((comment) => comment.time < nextProps.currentTime);
    this.setState({...this.state, previousComment, nextComment});
  }

  play() {
    this.props.play();
  }

  pause() {
    this.props.pause();
  }

  togglePlayPause() {
    if (this.props.playerState === PlayerStates.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextActionIsPlay() {
    return (this.props.playerState === PlayerStates.paused || this.props.playerState === PlayerStates.stopped);
  }

  onPreviousComment() {
    this.props.setPlayerTime(this.state.previousComment.time - SECONDS_COMMENT);
  }

  onNextComment() {
    this.props.setPlayerTime(this.state.nextComment.time - SECONDS_COMMENT);
  }

  render() {
    const playIconName = this.nextActionIsPlay() ? 'md-play' : 'md-pause';

    const buttonStyle = {height: 50, width: 75};
    const {previousComment, nextComment} = this.state;

    return (
      <View style={styles.footer}>
        <View style={styles.playHolder}>
          <View style={styles.playerButton}><Button style={buttonStyle} type="naked" iconColor={colors.barney} iconName="md-skip-backward" onPress={() => this.onPreviousComment()} disabled={!previousComment}/></View>
          <View style={styles.playerButton}><Button style={buttonStyle} type="naked" iconColor={colors.barney} iconName={playIconName} iconSize={50} onPress={() => this.togglePlayPause()}/></View>
          <View style={styles.playerButton}><Button style={buttonStyle} type="naked" iconColor={colors.barney} iconName="md-skip-forward" onPress={() => this.onNextComment()} disabled={!nextComment}/></View>
        </View>
      </View>
    );
  }
}

Control.propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  playHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerButton: {
    height: 50,
    width: 75
  }
});

export default connect(
  state => ({...state.session, ...state.comments, ...state.player, ...state.currentUser}),
  dispatch => bindActionCreators(Object.assign({}, PlayerActions, CommentsActions), dispatch))(Control);
