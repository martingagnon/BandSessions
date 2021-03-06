import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/current-user';

import {View, StyleSheet} from 'react-native';
import {Header, Screen, Content} from 'ui';
import BandList from './components/bands';
import BandSettings from './components/band-settings';
import Sessions from './components/sessions';
import Members from './components/members';
import Record from './components/record-button';
import colors from 'components/colors';

class Bands extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  };

  constructor(props) {
    super(props);
    props.updateCurrentuser();
  }

  onAddPressed = () => {
    this.props.navigation.navigate('Band', {});
  }

  onRecordPressed = () => {
    this.props.navigation.navigate('RecordSession', {bandId: this.props.band.id});
  }

  onSessionSelected = (session) => {
    const {navigate} = this.props.navigation;
    navigate('Session', {session});
  }

  onBandSetting = (band) => {
    this.props.navigation.navigate('Band', {band});
  }

  render() {
    const {band} = this.props;
    return (
      <Screen>
        <Header>Recordings</Header>
        <View style={styles.bands}>
          <BandList onAdd={() => this.onAddPressed()}/>
        </View>
        { band ? (
          <Content>
            <View style={styles.members}>
              <Members band={band}/>
              <BandSettings style={styles.bandSettings} onPress={() => this.onBandSetting(band)}/>
            </View>
            <Sessions style={styles.sessions} band={band} onPress={(session) => this.onSessionSelected(session)}/>
            <Record style={styles.record} onPress={() => this.onRecordPressed()}/>
          </Content>
        ) : (
          <Content></Content>
        )}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  bands: {
    height: 110
  },
  members: {
    height: 48,
    backgroundColor: colors.clear,
    flexDirection: 'row'
  },
  sessions: {
    flex: 1
  },
  record: {
    zIndex: 2,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  bandSettings: {
    marginRight: 10
  }
});

export default connect(
  state => (state.band),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
