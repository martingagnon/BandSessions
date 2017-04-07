import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import * as Actions from 'actions/sessions';

import SessionList from './components/session-list';
import ActionButton from '../tools/buttons/button';
import {styles} from './styles';

class Sessions extends Component {
  static navigationOptions = {
    title: 'Sessions'
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
  dataSource: PropTypes.object.isRequired
};

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(Actions, dispatch))(Sessions);
