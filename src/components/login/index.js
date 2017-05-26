import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {View, StyleSheet} from 'react-native';
import Splash from 'ui/splash';
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
      <Splash>
        <View style={styles.screen}>
          <LoginButton readPermissions={['email']}
            style={styles.login}
            onLoginFinished={
              (error, result) => {
                if (!error && !result.isCancelled) {
                  this.doLoggedIn();
                }
              }
            }></LoginButton>
          </View>
      </Splash>
    );
  }
}

Login.propTypes = {
  updateCurrentuser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  login: {
    flex: 1,
    height: 44,
    width: 200,
    alignSelf: 'flex-end',
    margin: 10
  }
});

export default connect(
  state => (state),
  dispatch => bindActionCreators(Object.assign({}, CurrentUserActions), dispatch))(Login);
