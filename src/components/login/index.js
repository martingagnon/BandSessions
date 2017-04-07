import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as SessionsActions from 'actions/sessions';
import * as BandsActions from 'actions/bands';
import {sessionService} from 'services/sessions';
import {bandService} from 'services/bands';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
    sessionService.observe((sessions) => props.updateSessions(sessions));
    bandService.observe((bands) => props.updateBands(bands));
  }

  loginWithFacebook() {
    const navigate = this.props.navigation.navigate;
    navigate('Bands');
  }

  render() {
    return (
      <View>
      <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.loginWithFacebook()}>
          Login with Facebook
      </Icon.Button>
      </View>
    );
  }
}

Login.propTypes = {
  updateBands: PropTypes.func.isRequired,
  updateSessions: PropTypes.func.isRequired
};

export default connect(
  state => (state),
  dispatch => bindActionCreators(Object.assign({}, SessionsActions, BandsActions), dispatch))(Login);
