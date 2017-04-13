import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as Actions from 'actions/session';
import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';
import PlayerStates from 'constants/player-states';
import Player from './components/player';
import {Content, Container} from 'ui';
import getCommentsService from 'services/comments';

class Session extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);

    const sessionId = props.navigation.state.params.session.id;
    const service = getCommentsService(sessionId, (comments) => props.updateComments(comments, sessionId));
    this.state = {session: props.navigation.state.params.session, service};
  }

  componentWillMount() {
    this.props.downloadSession(this.state.session);
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  addComment() {
    this.props.setPlayerState(PlayerStates.paused);
    const navigate = this.props.navigation.navigate;
    navigate('AddComment', {session: this.props.navigation.state.params.session});
  }

  render() {
    const {transferState, progress, audioPath} = this.props;
    const comments = this.props.comments[this.state.session.id] || [];
    const commentsCount = comments.length;

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
  setPlayerState: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired
};

export default connect(
  state => ({...state.session, ...state.comments}),
  dispatch => bindActionCreators(Object.assign({}, Actions, PlayerActions, CommentsActions), dispatch))(Session);
