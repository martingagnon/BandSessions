import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as CommentActions from 'actions/add-comment';
import * as PlayerActions from 'actions/player';
import PlayerStates from 'constants/player-states';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.container}>
        <Icon.Button name="plus-circle" backgroundColor="#3b5998" onPress={() => this.onAddComment()} />
      </View>
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
