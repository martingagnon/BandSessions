import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ListView} from 'react-native';

import * as Actions from 'actions/sessions';
import getSessionsService from 'services/sessions';

import SessionList from './components/session-list';
import {Container, Block, Content} from 'ui';
import {Button} from 'nachos-ui';

class Sessions extends Component {
  static navigationOptions = {
    title: 'Recordings'
  };

  constructor(props) {
    super(props);
    const bandId = props.navigation.state.params.band.id;
    const service = getSessionsService(bandId, (sessions) => props.updateSessions(sessions, bandId));
    this.state = {bandId, service, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillMount() {
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  onAddSessionPress = () => {
    const navigate = this.props.navigation.navigate;
    navigate('RecordSession', {bandId: this.state.bandId});
  };

  onSessionPressed = (session) => {
    const navigate = this.props.navigation.navigate;
    navigate('Session', {session});
  };

  render() {
    const bandSessions = this.props.sessions[this.state.bandId] || [];
    const dataSource = this.state.dataSource.cloneWithRows(bandSessions);
    return (
      <Container>
        <Content>
          <SessionList dataSource={dataSource} onPress={(session) => {
            this.onSessionPressed(session);
          }}/>
        </Content>
        <Block>
          <Button kind="squared" onPress={() => this.onAddSessionPress()}>Add Recording</Button>
        </Block>
      </Container>
    );
  }
}

Sessions.propTypes = {
  sessions: PropTypes.object.isRequired,
  updateSessions: PropTypes.func.isRequired
};

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(Actions, dispatch))(Sessions);
