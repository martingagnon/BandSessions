import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/sessions';

import SessionList from './components/session-list';
import {Container, Footer} from 'ui';
import {Button} from 'nachos-ui';

class Sessions extends Component {
  static navigationOptions = {
    title: 'Recordings'
  };

  onAddSessionPress = () => {
    const navigate = this.props.navigation.navigate;
    navigate('RecordSession');
  };

  onSessionPressed = (session) => {
    const navigate = this.props.navigation.navigate;
    navigate('Session', {session});
  };

  render() {
    return (
      <Container>
        <SessionList dataSource={this.props.dataSource} onPress={(session) => {
          this.onSessionPressed(session);
        }}/>
        <Footer>
          <Button kind="squared" onPress={() => this.onAddSessionPress()}>Add Recording</Button>
        </Footer>
      </Container>
    );
  }
}

Sessions.propTypes = {
  dataSource: PropTypes.object.isRequired
};

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(Actions, dispatch))(Sessions);
