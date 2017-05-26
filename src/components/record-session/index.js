import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/audio-recorder';
import playerStates from 'constants/player-states';

import {AudioUtils} from 'react-native-audio';
import KeepAwake from 'react-native-keep-awake';

import {Text, View, StyleSheet} from 'react-native';
import {Screen, Header, Center, SVGButton, Button} from 'ui';
import {RECORD_BUTTON_SVG} from 'constants/assets';
import colors from 'components/colors';

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
    this.resetRecording();
  }

  resetRecording() {
    this.props.stopRecording();
    this.props.prepareRecording(this.state.audioPath);
  }

  componentDidMount() {
    KeepAwake.activate();
  }

  componentWillUnmount() {
    KeepAwake.deactivate();
  }

  onClose() {
    this.props.navigation.goBack();
  }

  savePressed() {
    const navigate = this.props.navigation.navigate;
    navigate('AddSession', {filePath: this.state.audioPath, bandId: this.state.bandId, duration: this.props.time, bookmarks: this.props.bookmarks});
  }

  recordPressed() {
    this.props.toggleRecordPause();
  }

  deletePressed() {
    this.resetRecording();
  }

  bookmarkPressed() {
    this.props.addBookmark(this.props.time);
  }

  render() {
    const {recordingState, time} = this.props;
    const timeString = getTimeString(time);
    const showSaveButton = !(time === 0 || recordingState !== playerStates.paused);

    return (
      <Screen>
        <Header onClose={() => this.onClose()}>Record Session</Header>
        <Center>
          <Text style={styles.timer}>{timeString}</Text>
          <View style={styles.controls}>
            <SVGButton height={52} width={52} svg={RECORD_BUTTON_SVG} onPress={() => this.deletePressed()}/>
            <SVGButton height={100} width={100} svg={RECORD_BUTTON_SVG} onPress={() => this.recordPressed()}/>
            <SVGButton height={52} width={52} svg={RECORD_BUTTON_SVG} onPress={() => this.bookmarkPressed()}/>
          </View>
        </Center>
        <View style={styles.footer}>
          { showSaveButton ? (
            <Button style={styles.saveButton} onPress={() => this.savePressed()}>Save this recording</Button>
          ) : (null)}
        </View>
      </Screen>
    );
  }
}

RecordSession.propTypes = {
  recordingState: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  prepareRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
  toggleRecordPause: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  timer: {
    fontFamily: 'OpenSans-light',
    fontSize: 50,
    backgroundColor: colors.clear,
    color: colors.white
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250
  },
  saveButton: {
    height: 60,
    flex: 1
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default connect(
    state => (state.audioRecorder),
    dispatch => bindActionCreators(Actions, dispatch))(RecordSession);
