import React, {Component, PropTypes} from 'react';
import {TextInput, View, Text} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {styles} from './styles';

import * as Actions from 'actions/add-session';
import ActionButton from 'components/tools/buttons/button';
import fileTransferStates from 'constants/file-transfer-states';

class AddSession extends Component {
  static navigationOptions = {
    title: 'Save Session'
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session};
    this.state = {
      filePath: props.navigation.state.params.filePath
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.transferState === fileTransferStates.completed) {
      this.props.navigation.goBack();
    }
  }

  onSaveSessionPress = () => {
    this.props.addSession(this.state.filePath, {name: this.state.text});
  };

  render() {
    const {transferState, progress} = this.props;

    return (
      <View style={styles.container}>
        <Text>Recording name : {this.state.filePath}</Text>
        <TextInput style={styles.defaultInputText}
          onChangeText={(text) => this.setState({...this.state, text})} />

          <ActionButton title="Save Session" onPress={() => {
            this.onSaveSessionPress();
          }}>
          </ActionButton>
        <Text>UploadStatus: {progress}% {transferState}</Text>
      </View>
    );
  }
}

AddSession.propTypes = {
  addSession: PropTypes.func.isRequired
};

export default connect(
  state => (state.addSession),
  dispatch => bindActionCreators(Actions, dispatch))(AddSession);
