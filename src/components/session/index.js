import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import TransferState from 'constants/file-transfer-states';
import * as Actions from 'actions/session';
import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';
import getCommentsService from 'services/firebase/comments';

import {Screen, Header, Content, Container, Loading} from 'ui';
import Player from './player';
import Comments from './comments';
import Control from './toolbar/control';
import CommentsToolbar from './toolbar/comments';

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
    this.props.pause();
    const navigate = this.props.navigation.navigate;
    navigate('AddComment', {session: this.props.navigation.state.params.session});
  }

  onGoBack() {
    this.props.navigation.goBack();
  }

  render() {
    const {transferState, progress, audioPath} = this.props;
    const {session} = this.state;

    return (
      <Screen>
        <Header onGoBack={() => this.onGoBack()}>{session.name}</Header>
        {transferState === TransferState.completed ? (
          <Container>
            <Content>
              <Comments session={session} />
              <CommentsToolbar onAddComment={() => this.addComment()} session={this.state.session} />
              <Player session={session} audioPath={audioPath}/>
            </Content>
            <Control onAddComment={() => this.addComment()} session={this.state.session} />
          </Container>
        ) : (
          <Loading progress={progress}/>
        ) }
      </Screen>
    );
  }
}

Session.propTypes = {
  downloadSession: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired
};

export default connect(
  state => ({...state.session, ...state.comments}),
  dispatch => bindActionCreators(Object.assign({}, Actions, PlayerActions, CommentsActions), dispatch))(Session);
