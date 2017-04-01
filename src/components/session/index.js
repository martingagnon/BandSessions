import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import * as Actions from 'actions/session';
import Player from './components/player';
import {styles} from './styles';

class Session extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.session.name.toString()
  };

  constructor(props) {
    super(props);
    this.state = {session: props.navigation.state.params.session};
    props.downloadSession(this.state.session);
  }

  render() {
    const {transferState, progress, audioPath} = this.props;

    return (
      <View style={styles.container}>
        <Text>{transferState} {progress}</Text>
        {!!audioPath ? (<Player audioPath={audioPath}></Player>) : null }
      </View>
    );
  }
}

Session.propTypes = {
  downloadSession: PropTypes.func.isRequired
};

export default connect(
  state => (state.session),
  dispatch => bindActionCreators(Actions, dispatch))(Session);
