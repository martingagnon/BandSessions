import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as CommentActions from 'actions/add-comment';
import * as PlayerActions from 'actions/player';
import PlayerStates from 'constants/player-states';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from 'ui/container';

class AddComment extends Component {
  static navigationOptions = {
    title: 'Add comment'
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session, currentTime: this.props.player.currentTime};
  }

  onAddComment() {
    const {session, currentTime} = this.state;
    const comment = 'My comment';
    this.props.setPlayerState(PlayerStates.playing);
    this.props.addComment(session, comment, currentTime);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Icon.Button name="plus-circle" backgroundColor="#3b5998" onPress={() => this.onAddComment()} />
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
