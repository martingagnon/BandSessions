import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as CommentActions from 'actions/add-comment';
import * as PlayerActions from 'actions/player';
import PlayerStates from 'constants/player-states';
import Container from 'ui/container';

import {Switcher, Input, Button} from 'nachos-ui';

class AddComment extends Component {
  static navigationOptions = {
    title: 'Add comment'
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session, currentTime: this.props.player.currentTime, comment: '', emotion: 0};
  }

  onAddComment() {
    const {session, currentTime, comment, emotion} = this.state;
    this.props.addComment(session, comment, currentTime, emotion);
    this.props.setPlayerState(PlayerStates.playing);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
      <Input height={100} status="normal" placeholder="Comment"
        value={this.state.comment} multiline={true} numberOfLines={4}
        onChangeText={value => this.setState({...this.state, comment: value})}
      />
      <Switcher onChange={value => this.setState({...this.state, emotion: value})}>
        <Button value={1} iconName="ios-thumbs-up"/>
        <Button value={-1} iconName="ios-thumbs-down"/>
      </Switcher>
      <Button kind="squared" onPress={() => this.onAddComment()}
        disabled={this.state.comment.length <= 2}>Add</Button>
      </Container>
    );
  }
}

AddComment.propTypes = {
  setPlayerState: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(
  state => ({...state.addComment, player: state.player}),
  dispatch => bindActionCreators(Object.assign({}, CommentActions, PlayerActions), dispatch))(AddComment);
