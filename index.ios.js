import React, {Component} from 'react';

import ItemsScene from './components/items-scene';

import {
  AppRegistry
} from 'react-native';

export default class BandSessions extends Component {

  render() {
    return (
      <ItemsScene />
    );
  }
}

AppRegistry.registerComponent('BandSessions', () => BandSessions);
