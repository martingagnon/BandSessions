import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableHighlight} from 'react-native';

import * as Actions from 'actions/audio-recorder';
import playerStates from 'constants/player-states';
import styles from './styles';

import {AudioUtils} from 'react-native-audio';

import {Container, Block, Center} from 'ui';
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

  getTimeString(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);

    const hoursStart = 11;
    const length = 8;
    return date.toISOString().substr(hoursStart, length);
  }

  render() {
    const {recordingState, time} = this.props;
    const timeString = this.getTimeString(time);

    return (
      <Container>
        <Center>
          <Text style={styles.timer}>{timeString}</Text>
        </Center>

        <Block>
          <View style={styles.footer}>
            <View style={styles.recordingView}>
              <Button kind="squared" style={styles.recordingButton} iconSize={90} iconName={(recordingState !== playerStates.recording) ? 'md-microphone' : 'md-pause'} onPress={() => this.recordPressed()}></Button>
            </View>
            <View style={styles.saveView}>
              <Button kind="squared" style={styles.saveButton} iconSize={40} iconName="md-archive" disabled={time === 0 || recordingState !== playerStates.paused} onPress={() => this.savePressed()}></Button>
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
