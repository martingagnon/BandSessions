import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';
import {BOOKMARK_EMOJI} from 'constants/comment-emojis'
import PlayerStates from 'constants/player-states';

import {Button} from 'nachos-ui';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const SECONDS_COMMENT = 5;

class Toolbar extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

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

  addThumbs(emoji) {
    const {session, currentTime, currentUser} = this.props;
    this.props.addComment(session, '', currentTime, emoji, currentUser);
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
    const commentButtonStyle = {height: 50, width: 160};
    const playButtonStyle = {height: 100, width: 100};
    const {previousComment, nextComment} = this.state;

    return (
      <View style={styles.footer}>
        <View style={styles.thumbsHolder}>
          <Button type="success" style={buttonStyle} kind="squared" iconSize={30} iconName="md-thumbs-up" onPress={() => this.addThumbs('👍')}/>
          <Button type="danger" style={buttonStyle} kind="squared" iconSize={30} iconName="md-thumbs-down" onPress={() => this.addThumbs(BOOKMARK_EMOJI)}/>
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
            <View style={styles.previousNextButton}><Button style={buttonStyle} kind="squared" iconName="md-skip-backward" onPress={() => this.onPreviousComment()} disabled={!previousComment}/></View>
            <View style={styles.previousNextButton}><Button style={buttonStyle} kind="squared" iconName="md-skip-forward" onPress={() => this.onNextComment()} disabled={!nextComment}/></View>
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
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

export default connect(
  state => ({...state.session, ...state.comments, ...state.player, ...state.currentUser}),
  dispatch => bindActionCreators(Object.assign({}, PlayerActions, CommentsActions), dispatch))(Toolbar);
