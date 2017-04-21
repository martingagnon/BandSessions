import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as Actions from 'actions/session';
import * as PlayerActions from 'actions/player';
import * as CommentsActions from 'actions/comments';
import TransferState from 'constants/file-transfer-states';
import Player from './player';
import Comments from './comments';
import Toolbar from './toolbar';
import {Content, Container, Loading} from 'ui';
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
    this.props.pause();
    const navigate = this.props.navigation.navigate;
    navigate('AddComment', {session: this.props.navigation.state.params.session});
  }

  render() {
    const {transferState, progress, audioPath} = this.props;
    const {session} = this.state;

    return (
      <Container>
        {transferState === TransferState.completed ? (
          <Container>
            <Content>
              <Player session={session} audioPath={audioPath}/>
              <Comments session={session} />
            </Content>
            <Toolbar onAddComment={() => this.addComment()} session={this.state.session} />
          </Container>
        ) : (
          <Loading progress={progress}/>
        ) }
      </Container>
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
