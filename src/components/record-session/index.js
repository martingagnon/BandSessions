import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import playerStates from 'constants/player-states';
import * as Actions from 'actions/audio-recorder';
import {getTimeString} from 'services/utils';
import {AudioUtils} from 'react-native-audio';

import {Text, View} from 'react-native';
import {Button} from 'nachos-ui';
import {Container, Block, Center} from 'ui';
import styles from './styles';

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
