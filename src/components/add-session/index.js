import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import fileTransferStates from 'constants/file-transfer-states';
import * as Actions from 'actions/sessions';

import {Input, Button} from 'nachos-ui';
import Container from 'ui/container';

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
  }

  componentWillUpdate(nextProps) {
    if (nextProps.transferState === fileTransferStates.completed
      && this.props.transferState !== fileTransferStates.completed) {
      this.props.navigation.goBack();
    }
  }

  onSaveSessionPress = () => {
    this.props.addSession(this.state.bandId, this.state.filePath, {name: this.state.recordingName});
  };

  render() {
    // TODO: Add progress popup (Dan?) const {transferState, progress} = this.props;

    return (
      <Container>
        <Input status="normal" placeholder="Recording name"
          value={this.state.recordingName}
          onChangeText={recordingName => this.setState({...this.state, recordingName })}
        />
        <Button kind="squared" onPress={() => this.onSaveSessionPress()} disabled={this.state.recordingName.length <= 2}>Add</Button>
      </Container>
    );
  }
}

AddSession.propTypes = {
  addSession: PropTypes.func.isRequired
};

export default connect(
  state => (state.addSession),
  dispatch => bindActionCreators(Actions, dispatch))(AddSession);
