import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text} from 'react-native';

import * as Actions from 'actions/record-session';
import playerStates from 'constants/player-states';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

import Container from 'ui/container';
import {Button} from 'nachos-ui';

class RecordSession extends Component {
  static navigationOptions = {
    title: 'Record'
  };

  constructor(props) {
    super(props);
    this.state = {
      audioPath: `${AudioUtils.DocumentDirectoryPath }/audio.aac`
    };
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    this.prepareRecordingPath(this.state.audioPath);
    this.props.setRecordingTime(0);
    this.props.setRecordingState(playerStates.stopped);
    AudioRecorder.onProgress = (data) => {
      this.props.setRecordingTime(Math.floor(data.currentTime));
    };
  }

  componentWillUnmount() {
    AudioRecorder.stopRecording();
  }

  async savePressed() {
    await AudioRecorder.stopRecording();
    this.props.setRecordingState(playerStates.stopped);

    const navigate = this.props.navigation.navigate;
    navigate('AddSession', {filePath: this.state.audioPath});
  }

  async recordPressed() {
    switch (this.props.recordingState) {
      case playerStates.stopped:
      case playerStates.paused:
        await AudioRecorder.startRecording();
        this.props.setRecordingState(playerStates.recording);
        break;
      case playerStates.recording:
        await AudioRecorder.pauseRecording();
        this.props.setRecordingState(playerStates.paused);
        break;
    }
  }

  render() {
    const {recordingState, time} = this.props;

    return (
      <Container>
        <Button kind="squared" onPress={() => this.recordPressed()}>{(recordingState !== playerStates.recording) ? 'Record' : 'Pause'}</Button>
        <Text>{time}{recordingState}</Text>
        {time > 0 && recordingState === playerStates.paused ? (
          <Button kind="squared" onPress={() => this.savePressed()}>Save</Button>
        ) : (
          <Button kind="squared" disabled>Save</Button>
        )}
      </Container>
    );
  }
}

RecordSession.propTypes = {
  recordingState: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  setRecordingState: PropTypes.func.isRequired,
  setRecordingTime: PropTypes.func.isRequired
};

export default connect(
    state => (state.recordSession),
    dispatch => bindActionCreators(Actions, dispatch))(RecordSession);
