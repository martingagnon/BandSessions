import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import {download} from 'src/services/sessions.js';

import * as Actions from './actions';
import Player from './components/player';
import {styles} from './styles';

class Session extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

Session.propTypes = {
};

export default connect(
  state => (state.session),
  dispatch => bindActionCreators(Actions, dispatch))(Session);
