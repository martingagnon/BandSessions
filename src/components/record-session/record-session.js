import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';

import ActionButton from '../buttons/button';

import {recordingStates} from '../../actions/record-session';
import {styles} from './styles';

export default class RecordSession extends Component {
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
    return filePath;
  }

  async _record() {
    if (this.shouldPrepareRecording()) {
      this.prepareRecordingPath(this.state.audioPath);
    }
    await AudioRecorder.startRecording();
    this.props.setRecordingState(recordingStates.recording);
  }

  async _play() {
      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      const sound = new Sound(this.state.audioPath, '');
      setTimeout(() => {
        sound.play();
      }, 100);
    }, 100);
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
        <ActionButton title="stop" onPress={() => {
          this._stop();
        }}></ActionButton>
        <ActionButton title="play" onPress={() => {
          this._play();
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
