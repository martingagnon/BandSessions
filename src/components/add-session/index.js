import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import TransferStates from 'constants/file-transfer-states';
import * as Actions from 'actions/sessions';
import * as SessionActions from 'actions/session';

import {View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import {Screen, Loading, Button} from 'ui';

import colors from 'components/colors';

const LOADING_STATES = [TransferStates.pending, TransferStates.completed];

class AddSession extends Component {
  static navigationOptions = {
    title: 'Save Session'
  };

  constructor(props) {
    super(props);
    this.state = {
      filePath: props.navigation.state.params.filePath,
      bandId: props.navigation.state.params.bandId,
      recordingName: ''
    };
    this.props.uploadUnstarted();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.transferState === TransferStates.completed
      && this.props.transferState !== TransferStates.completed) {
      const {navigation} = this.props;
      navigation.goBack(this.props.nav.routes[2].key);
    }
  }

  onSaveSessionPress = () => {
    this.props.addSession(this.state.bandId, this.state.filePath, {name: this.state.recordingName});
  };

  render() {
    const {transferState, progress} = this.props;
    const shouldShowLoading = LOADING_STATES.includes(transferState);
    const canSave = this.state.recordingName.length > 2;

    return (
      <Screen>
      {shouldShowLoading ? (
        <Loading progress={progress}/>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.center}>
            <View style={styles.textHolder}>
              <TextInput style={styles.input} placeholder="Recording name"
                value={this.state.recordingName}
                onChangeText={recordingName => this.setState({...this.state, recordingName })}/>
            </View>
          </View>
          <View style={styles.footer}>
            <Button style={styles.save} disabled={!canSave} onPress={() => this.onSaveSessionPress()} disabled={this.state.recordingName.length <= 2}>Upload & Save</Button>
          </View>
        </KeyboardAvoidingView>
      ) }
      </Screen>
    );
  }
}

AddSession.propTypes = {
  addSession: PropTypes.func.isRequired,
  uploadUnstarted: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  textHolder: {
    flex: 1,
    maxHeight: 60,
    borderRadius: 20,
    backgroundColor: colors.white
  },
  input: {
    flex: 1,
    margin: 10,
    fontFamily: 'OpenSans'
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  },
  save: {
    flex: 1
  }
});

export default connect(
  state => ({...state.addSession, nav: state.nav}),
  dispatch => bindActionCreators(Object.assign({}, Actions, SessionActions), dispatch))(AddSession);
