import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import * as SessionsActions from './actions';
import SessionList from './components/session-list';
import ActionButton from '../buttons/button';
import Player from '../player/player';
import {styles} from './styles';

@connect(state => (state.sessions), (dispatch) => bindActionCreators(SessionsActions, dispatch))
class Sessions extends Component {
  static navigationOptions = {
    title: 'Sessions'
  };

  onAddSessionPress = () => {
    const navigate = this.props.navigation.navigate;
    navigate('RecordSession', {onAdd: (sessionName) => this.props.addSession(sessionName)});
  };

  render() {
    return (
      <View style={styles.container}>
        <SessionList dataSource={this.props.dataSource} onPress={() => {

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
