import React, {Component, PropTypes} from 'react';
import {Modal, View, Text, TouchableHighlight, TextInput} from 'react-native';

import {styles} from './styles'
import ActionButton from '../buttons/button';

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
    const {visible, onAdd} = this.props;

    return (
      <Modal animationType={'slide'} transparent={false} visible={visible} >
       <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add Session</Text>
          <TextInput style={styles.input} onChangeText={(text) => this.setSessionName(text)}
              value={this.state.sessionName}/>
          <ActionButton onPress={() => onAdd(this.state.sessionName)} title="Submit">
          </ActionButton>
        </View>
       </View>
      </Modal>
    );
  }
}

AddSessionModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired
};

