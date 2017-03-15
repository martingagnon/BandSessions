import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux';
import Sessions from './src/containers/sessions';
import configureStore from './src/store/configure-store';

const store = configureStore();

export default class BandSessions extends Component {
  render() {
    return (
      <Provider store={store}>
        <Sessions />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BandSessions', () => BandSessions);
