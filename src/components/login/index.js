import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Center} from 'ui';
import * as CurrentUserActions from 'actions/current-user';

import {LoginButton} from 'react-native-fbsdk';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  doLoggedIn() {
    this.props.onLogin();
  }

  render() {
    return (
      <Center>
        <LoginButton readPermissions={['email']}
          onLoginFinished={
            (error, result) => {
              if (!error && !result.isCancelled) {
                this.doLoggedIn();
              }
            }
          }/>
      </Center>
    );
  }
}

Login.propTypes = {
  updateCurrentuser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default connect(
  state => (state),
  dispatch => bindActionCreators(Object.assign({}, CurrentUserActions), dispatch))(Login);
