import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import TransferStates from 'constants/file-transfer-states';
import * as Actions from 'actions/sessions';
import * as SessionActions from 'actions/session';
import {Container, Content, Loading} from 'ui';
import {Input, Button} from 'nachos-ui';

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

    return (
      <Container>
      {shouldShowLoading ? (
        <Loading progress={progress}/>
      ) : (
        <Content>
          <Input status="normal" placeholder="Recording name"
            value={this.state.recordingName}
            onChangeText={recordingName => this.setState({...this.state, recordingName })}
          />
          <Button kind="squared" onPress={() => this.onSaveSessionPress()} disabled={this.state.recordingName.length <= 2}>Add</Button>
        </Content>
      ) }
      </Container>
    );
  }
}

AddSession.propTypes = {
  addSession: PropTypes.func.isRequired,
  uploadUnstarted: PropTypes.func.isRequired
};

export default connect(
  state => ({...state.addSession, nav: state.nav}),
  dispatch => bindActionCreators(Object.assign({}, Actions, SessionActions), dispatch))(AddSession);
