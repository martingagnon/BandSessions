import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as Actions from 'actions/session';
import * as PlayerActions from 'actions/player';
import PlayerStates from 'constants/player-states';
import Player from './components/player';
import {Content, Container} from 'ui';

class Session extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session};
  }

  componentDidMount() {
    this.props.downloadSession(this.state.session);
  }

  addComment() {
    this.props.setPlayerState(PlayerStates.paused);
    const navigate = this.props.navigation.navigate;
    navigate('AddComment', {session: this.props.navigation.state.params.session});
  }

  render() {
    const {transferState, progress, audioPath} = this.props;
    const commentsCount = this.state.session.comments ? this.state.session.comments.length : 0;

    return (
      <Container>
        <Content>
          <Text>{transferState} - {progress} - {commentsCount}</Text>
          {!!audioPath ? (<Player audioPath={audioPath} addComment={() => this.addComment()}></Player>) : (<View></View>) }
        </Content>
      </Container>
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
