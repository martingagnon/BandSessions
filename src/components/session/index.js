import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as Actions from 'actions/session';
import * as PlayerActions from 'actions/player';
import PlayerStates from 'constants/player-states';
import Player from './components/player';
import {styles} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

class Session extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session};
    props.downloadSession(this.state.session);
  }

  addComment() {
    this.props.setPlayerState(PlayerStates.paused);
    const navigate = this.props.navigation.navigate;
    navigate('AddComment', {session: this.props.navigation.state.params.session});
  }

  render() {
    const {transferState, progress, audioPath} = this.props;

    return (
      <View style={styles.container}>
        <Text>{transferState} {progress}</Text>
        {!!audioPath ? (<Player audioPath={audioPath}></Player>) : null }
        <Icon.Button name="comment" backgroundColor="#3b5998" onPress={() => this.addComment()} />
      </View>
    );
  }
}

Session.propTypes = {
  downloadSession: PropTypes.func.isRequired,
  setPlayerState: PropTypes.func.isRequired
};

export default connect(
  state => (state.session),
  dispatch => bindActionCreators(Object.assign({}, Actions, PlayerActions), dispatch))(Session);
