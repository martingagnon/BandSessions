import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text} from 'react-native';

import * as Actions from 'actions/audio-recorder';
import playerStates from 'constants/player-states';

import {AudioUtils} from 'react-native-audio';

import {Container, Block} from 'ui';
import {Button} from 'nachos-ui';

class RecordSession extends Component {
  static navigationOptions = {
    title: 'Record'
  };

  constructor(props) {
    super(props);
    this.state = {
      audioPath: `${AudioUtils.DocumentDirectoryPath }/audio.aac`,
      bandId: props.navigation.state.params.bandId
    };
  }

  componentDidMount() {
    this.props.prepareRecording(this.state.audioPath);
  }

  componentWillUnmount() {
    this.props.stopRecording();
  }

  async savePressed() {
    this.props.stopRecording();

    const navigate = this.props.navigation.navigate;
    navigate('AddSession', {filePath: this.state.audioPath, bandId: this.state.bandId});
  }

  async recordPressed() {
    this.props.toggleRecordPause();
  }

  render() {
    const {recordingState, time} = this.props;

    return (
      <Container>
        <Button kind="squared" onPress={() => this.recordPressed()}>{(recordingState !== playerStates.recording) ? 'Record' : 'Pause'}</Button>
        <Text>{time}{recordingState}</Text>
        <Block>
          <Button kind="squared" disabled={time === 0 || recordingState !== playerStates.paused} onPress={() => this.savePressed()}>Save</Button>
        </Block>
      </Container>
    );
  }
}

RecordSession.propTypes = {
  recordingState: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  prepareRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
  toggleRecordPause: PropTypes.func.isRequired

};

export default connect(
    state => (state.audioRecorder),
    dispatch => bindActionCreators(Actions, dispatch))(RecordSession);
