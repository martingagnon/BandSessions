import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/current-user';

import {View} from 'react-native';
import {Content} from 'ui';
import BandList from './components/bands';
import Sessions from './components/sessions';
import Members from './components/members';
import styles from './styles';

class Bands extends Component {
  static navigationOptions = {
    title: 'Bands'
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
      <Content>
        <View style={styles.bands}>
          <BandList onAdd={() => this.onAddPressed()}/>
        </View>
        { band ? (
          <Content>
            <View style={styles.members}>
              <Members band={band}/>
            </View>
            <Sessions band={band} onPress={(session) => this.onSessionSelected(session)}/>
          </Content>
        ) : (
          <Content></Content>
        )}
      </Content>
    );
  }
}

export default connect(
  state => (state.band),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
