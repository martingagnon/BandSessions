import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import * as SessionsActions from './actions';
import SessionList from './components/session-list';
import ActionButton from '../buttons/button';
import {styles} from './styles';

class Sessions extends Component {
  static navigationOptions = {
    title: 'Sessions'
  };

  onAddSessionPress = () => {
    const navigate = this.props.navigation.navigate;
    navigate('RecordSession', {onAdd: (sessionName) => this.props.addSession(sessionName)});
  };

  onSessionPressed = (session) => {
    const navigate = this.props.navigation.navigate;
    navigate('Session', {session});
  };

  render() {
    return (
      <View style={styles.container}>
        <SessionList dataSource={this.props.dataSource} onPress={(session) => {
          this.onSessionPressed(session);
        }}/>

        <ActionButton title="Add Session" onPress={() => {
          this.onAddSessionPress();
        }}>
        </ActionButton>
      </View>
    );
  }
}

Sessions.propTypes = {
  dataSource: PropTypes.object.isRequired,
  addSession: PropTypes.func.isRequired
};

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(SessionsActions, dispatch))(Sessions);
