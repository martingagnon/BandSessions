import React, {Component, PropTypes} from 'react';
import {Modal, View} from 'react-native';

import {styles} from './styles';
import RecordSession from '../record-session/container.js';

export default class AddSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {sessionName: ''};
  }

  setSessionName(text) {
    const newState = this.state;
    newState.sessionName = text;
    this.setState(newState);
  }

  render() {
    const {visible} = this.props;

    return (
      <Modal animationType={'slide'} transparent={false} visible={visible} >
       <View style={styles.container}>
         <RecordSession></RecordSession>
       </View>
      </Modal>
    );
  }
}

AddSessionModal.propTypes = {
  visible: PropTypes.bool.isRequired
};

