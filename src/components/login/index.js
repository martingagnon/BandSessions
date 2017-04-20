import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as CurrentUserActions from 'actions/current-user';

import {LoginButton, AccessToken} from 'react-native-fbsdk';
import Container from 'ui/container';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
    this.state = {showLogin: false};
    this.validateAccessToken();
  }

  async validateAccessToken() {
    const accessToken = await AccessToken.getCurrentAccessToken();
    if (accessToken) {
      this.doLoggedIn();
    }
    this.setState({showLogin: true});
  }

  doLoggedIn() {
    this.props.updateCurrentuser();
    const navigate = this.props.navigation.navigate;
    navigate('Bands');
  }

  render() {
    const {showLogin} = this.state;

    return (
      <Container>
        {showLogin ? (
        <LoginButton readPermissions={['email']}
          onLoginFinished={
            (error, result) => {
              if (!error && !result.isCancelled) {
                this.doLoggedIn();
              }
            }
          }/>
        ) : null}
      </Container>
    );
  }
}

Login.propTypes = {
  updateCurrentuser: PropTypes.func.isRequired
};

export default connect(
  state => (state),
  dispatch => bindActionCreators(Object.assign({}, CurrentUserActions), dispatch))(Login);
