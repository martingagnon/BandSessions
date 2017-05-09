import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as CommentActions from 'actions/comments';
import * as PlayerActions from 'actions/player';
import {View, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Button, Screen, Header} from 'ui';

import colors from 'components/colors';

class AddComment extends Component {
  static navigationOptions = {
    title: 'Add comment'
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session, currentTime: this.props.player.currentTime, comment: '', emotion: 0};
  }

  onAddComment() {
    const {session, currentTime, comment, emoji} = this.state;
    this.props.addComment(session, comment, currentTime, emoji, this.props.currentUser);
    this.props.play();
    this.props.navigation.goBack();
  }

  onGoBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Screen>
        <Header onGoBack={() => this.onGoBack()}>Add Comment</Header>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.center}>
            <View style={styles.textHolder}>
              <TextInput style={styles.input} placeholder="Comment"
                value={this.state.comment}
                multiline={true} numberOfLines={4}
                onChangeText={comment => this.setState({...this.state, comment })}/>
            </View>
          </View>
          <View style={styles.footer}>
            <Button style={styles.save} disabled={this.state.comment.length <= 2} onPress={() => this.onAddComment()}>Add Comment</Button>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

AddComment.propTypes = {
  play: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  textHolder: {
    flex: 1,
    maxHeight: 105,
    borderRadius: 20,
    backgroundColor: colors.white
  },
  input: {
    flex: 1,
    margin: 10,
    fontFamily: 'OpenSans'
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  },
  save: {
    flex: 1
  }
});


export default connect(
  state => ({...state.addComment, player: state.player, ...state.currentUser}),
  dispatch => bindActionCreators(Object.assign({}, CommentActions, PlayerActions), dispatch))(AddComment);
