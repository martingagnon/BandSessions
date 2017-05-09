import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/current-user';

import {View, StyleSheet} from 'react-native';
import {Header, Screen, Content} from 'ui';
import BandList from './components/bands';
import Sessions from './components/sessions';
import Members from './components/members';
import colors from 'components/colors'

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

  onSessionSelected = (session) => {
    const {navigate} = this.props.navigation;
    navigate('Session', {session});
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
            </View>
            <Sessions style={styles.sessions} band={band} onPress={(session) => this.onSessionSelected(session)}/>
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
    backgroundColor: colors.clear
  },
  sessions: {
    flex: 1
  }
});

export default connect(
  state => (state.band),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
