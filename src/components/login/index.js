import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Container from 'ui/container';
import {Button} from 'nachos-ui';
import * as CurrentUserActions from 'actions/current-user';

import {LoginButton} from 'react-native-fbsdk';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
  }

  doLoggedIn() {
    this.props.updateCurrentuser();
    const navigate = this.props.navigation.navigate;
    navigate('Bands');
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
          <Button onPress={() => this.doLoggedIn()}/>
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
