import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {AppNavigator} from 'components/navigation';
import {AccessToken} from 'react-native-fbsdk';
import {View, StatusBar} from 'react-native';
import Splash from 'components/splash';
import Login from 'components/login';

import configureStore from './store';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
const store = configureStore(navReducer);

@connect(state => ({nav: state.nav}))
class AppWithNavigationState extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.validateAccessToken();
  }

  async validateAccessToken() {
    const accessToken = await AccessToken.getCurrentAccessToken();
    this.setState({tokenValid: !!accessToken});
  }

  appNavigator() {
    return (
      <View style={{flex: 1,backgroundColor: 'transparent'}}>
        <StatusBar barStyle="light-content"/>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />
      </View>
    );
  }

  splash() {
    return (
      <Splash/>
    );
  }

  login() {
    return (
      <Login onLogin={() => this.validateAccessToken()}/>
    );
  }

  render() {
    const {tokenValid} = this.state;
    if (tokenValid === true) {
      return this.appNavigator();
    } else if (tokenValid === false) {
      return this.login();
    } else {
      return this.splash();
    }
  }
}

export default function BandSession() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
