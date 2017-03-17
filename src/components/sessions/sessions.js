import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import SessionList from './session-list';
import ActionButton from '../buttons/button';
import AddSessionModal from '../add-session/add-session-modal';
import Player from '../player/player';
import {styles} from './styles';

export default class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    const newState = this.state;
    newState.modalVisible = visible;
    this.setState(newState);
  }

  render() {
    const {dataSource, addSession} = this.props;
    const session = this.state.session;

    const player = (!!session) ? <Player session={session}></Player> : null;  

    return (
      <View style={styles.container}>
        <AddSessionModal visible={this.state.modalVisible} onAdd={(sessionName) => {
          this.setModalVisible(false);
          addSession(sessionName);
        }} />
        <SessionList dataSource={dataSource} onPress={(sessionItem) => {
          this.setState({session: sessionItem})
        }}/>

        {player}

        <ActionButton title="Add Session" onPress={() => {
          this.setModalVisible(true);
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
