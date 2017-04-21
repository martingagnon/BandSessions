import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Container from 'ui/container';
import * as CurrentUserActions from 'actions/current-user';

import {LoginButton} from 'react-native-fbsdk';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  doLoggedIn() {
    this.props.updateCurrentuser();
    this.props.onLogin();
  }

  render() {
    return (
      <Container>
        <LoginButton readPermissions={['email']}
          onLoginFinished={
            (error, result) => {
              if (!error && !result.isCancelled) {
                this.doLoggedIn();
              }
            }
          }/>
      </Container>
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
