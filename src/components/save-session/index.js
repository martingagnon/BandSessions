import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {styles} from './styles';

import * as Actions from './actions';
import ActionButton from '../buttons/button';

class SaveSession extends Component {
  static navigationOptions = {
    title: 'Save Session'
  };

  constructor(props) {
    super(props);
    this.state = {
      filePath: props.navigation.state.params.filePath
    };
  }

  onSaveSessionPress = () => {

  };

  render() {
    return (
      <View style={styles.container}>
      <Text>Recording name : {this.state.filePath}</Text>
        <TextInput style={styles.defaultInputText}
          onChangeText={(text) => this.setState({...this.state, text})} />

          <ActionButton title="Save Session" onPress={() => {
            this.onSaveSessionPress();
          }}>
          </ActionButton>
      </View>
    );
  }
}

SaveSession.propTypes = {
};

export default connect(
  state => (state.session),
  dispatch => bindActionCreators(Actions, dispatch))(SaveSession);
