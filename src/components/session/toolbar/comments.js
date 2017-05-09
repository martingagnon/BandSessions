import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as CommentsActions from 'actions/comments';

import {BOOKMARK_EMOJI} from 'constants/comment-emojis';

import {View, StyleSheet} from 'react-native';
import {Button} from 'nachos-ui';

class Comments extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  addThumbs(emoji) {
    const {session, currentTime, currentUser} = this.props;
    this.props.addComment(session, '', currentTime, emoji, currentUser);
  }

  render() {
    const buttonStyle = {height: 50, width: 75};

    return (
      <View style={styles.footer}>
        <View style={styles.actionButton}><Button type="naked" style={buttonStyle} iconSize={30} iconName="md-thumbs-up" onPress={() => this.addThumbs('👍')}/></View>
        <View style={styles.actionButton}><Button type="naked" style={buttonStyle} iconSize={30} iconName="md-musical-notes" onPress={() => this.addThumbs(BOOKMARK_EMOJI)}/></View>
        <View style={styles.actionButton}><Button type="naked" style={buttonStyle} iconSize={30} iconName="md-add-circle" onPress={() => this.props.onAddComment()}/></View>
      </View>
    );
  }
}

Comments.propTypes = {
  addComment: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  actionButton: {
    height: 50,
    width: 50
  }
});

export default connect(
  state => ({...state.session, ...state.player, ...state.currentUser}),
  dispatch => bindActionCreators(CommentsActions, dispatch))(Comments);
