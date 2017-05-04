import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';

import * as Actions from 'actions/audio-recorder';
import playerStates from 'constants/player-states';
import styles from './styles';

import {AudioUtils} from 'react-native-audio';
import KeepAwake from 'react-native-keep-awake';
import {Button} from 'nachos-ui';
import {Container, Block, Center} from 'ui';

import {getTimeString} from 'services/utils';

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
    props.stopRecording();
    props.prepareRecording(this.state.audioPath);
  }

  componentDidMount() {
    KeepAwake.activate();
  }

  componentWillUnmount() {
    KeepAwake.deactivate();
  }

  async savePressed() {
    const navigate = this.props.navigation.navigate;
    navigate('AddSession', {filePath: this.state.audioPath, bandId: this.state.bandId});
  }

  async recordPressed() {
    this.props.toggleRecordPause();
  }

  render() {
    const {recordingState, time} = this.props;
    const timeString = getTimeString(time);

    const recordingButtonStyle = {height: 100, width: 100};
    const saveButtonStyle = {height: 75, width: 75};

    return (
      <Container>
        <Center>
          <Text style={styles.timer}>{timeString}</Text>
        </Center>
        <Block>
          <View style={styles.footer}>
            <View style={styles.recordingView}>
              <Button kind="squared" style={recordingButtonStyle} iconSize={90} iconName={(recordingState !== playerStates.recording) ? 'md-microphone' : 'md-pause'} onPress={() => this.recordPressed()}></Button>
            </View>
            <View style={styles.saveView}>
              <Button kind="squared" style={saveButtonStyle} iconSize={40} iconName="md-archive" disabled={time === 0 || recordingState !== playerStates.paused} onPress={() => this.savePressed()}></Button>
            </View>
          </View>
        </Block>
        <Block>
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
