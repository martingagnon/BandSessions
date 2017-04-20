import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';
import PlayerStates from 'constants/player-states';
import {Button} from 'nachos-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class Toolbar extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

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

  addThumbs(emotion) {
    const {session, currentTime, currentUser} = this.props;
    this.props.addComment(session, '', currentTime, emotion, currentUser);
  }

  render() {
    const playIconName = this.nextActionIsPlay() ? 'md-play' : 'md-pause';

    const buttonStyle = {height: 50, width: 75};
    const commentButtonStyle = {height: 50, width: 160};
    const playButtonStyle = {height: 100, width: 100};

    return (
      <View style={styles.footer}>
        <View style={styles.thumbsHolder}>
          <Button type="success" style={buttonStyle} kind="squared" iconSize={30} iconName="md-thumbs-up" onPress={() => this.addThumbs(1)}/>
          <Button type="danger" style={buttonStyle} kind="squared" iconSize={30} iconName="md-thumbs-down" onPress={() => this.addThumbs(-1)}/>
        </View>
        <View style={styles.playHolder}>
          <Button type="naked" iconColor="#000000" style={playButtonStyle} kind="squared" iconSize={50} iconName={playIconName} onPress={() => this.togglePlayPause()}/>
        </View>
        <View style={styles.commentsHolder}>
          <View style={styles.commentsRow}>
            <Icon name="md-chatbubbles" size={20} color="#000000"/>
            <Text>Comments</Text>
          </View>
          <View style={styles.previousNextRow}>
            <View style={styles.previousNextButton}><Button style={buttonStyle} kind="squared" iconName="md-skip-backward"/></View>
            <View style={styles.previousNextButton}><Button style={buttonStyle} kind="squared" iconName="md-skip-forward"/></View>
          </View>
          <View style={styles.addCommentRow}>
            <Button style={commentButtonStyle} kind="squared" iconSize={30} iconName="md-add-circle" onPress={() => this.props.onAddComment()}/>
          </View>
        </View>
      </View>
    );
  }
}

Toolbar.propTypes = {
  setPlayerState: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

export default connect(
  state => ({...state.session, ...state.comments, ...state.player, ...state.currentUser}),
  dispatch => bindActionCreators(Object.assign({}, PlayerActions, CommentsActions), dispatch))(Toolbar);
