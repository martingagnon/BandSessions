import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as RecordSessionActions from './actions';

import {View, Text} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import ActionButton from '../buttons/button';

import {styles} from './styles';
import {upload} from '../../services/sessions.js';

const {recordingStates} = RecordSessionActions;

class RecordSession extends Component {
  static navigationOptions = {
    title: 'Record'
  };

  constructor(props) {
    super(props);
    this.state = {
      audioPath: `${AudioUtils.DocumentDirectoryPath }/test.aac`
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

    AudioRecorder.onProgress = (data) => {
      this.props.setRecordingTime(Math.floor(data.currentTime));
    };
  }

  shouldPrepareRecording() {
    return (this.props.recordingState === recordingStates.stopped);
  }

  async _pause() {
    await AudioRecorder.pauseRecording();
    this.props.setRecordingState(recordingStates.paused);
  }

  async _stop() {
    const filePath = await AudioRecorder.stopRecording();
    this.props.setRecordingState(recordingStates.stopped);
    upload(this.state.audioPath);
    this.props.navigation.goBack();
    return filePath;
  }

  async _record() {
    if (this.shouldPrepareRecording()) {
      this.prepareRecordingPath(this.state.audioPath);
    }
    await AudioRecorder.startRecording();
    this.props.setRecordingState(recordingStates.recording);
  }

  render() {
    const {recordingState, time} = this.props;

    return (
      <View style={styles.container}>
        <Text>{recordingState} - {time}s</Text>
        <ActionButton title="record" onPress={() => {
          this._record();
        }}></ActionButton>
        <ActionButton title="pause" onPress={() => {
          this._pause();
        }}></ActionButton>
        <ActionButton title="complete" onPress={() => {
          this._stop();
        }}></ActionButton>
      </View>
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
    dispatch => bindActionCreators(RecordSessionActions, dispatch))(RecordSession);
