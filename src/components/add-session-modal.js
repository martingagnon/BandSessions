import React, {Component, PropTypes} from 'react';
import {Modal, View, Text, TouchableHighlight, TextInput} from 'react-native';

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
       <View style={{marginTop: 22}}>
        <View>
          <Text>Add Session</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setSessionName(text)}
              value={this.state.sessionName}
            />
          <TouchableHighlight onPress={() => onAdd(this.state.sessionName)}>
            <Text>Add item</Text>
          </TouchableHighlight>
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

