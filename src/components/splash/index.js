import React, {Component} from 'react';
import SplashBackground from 'ui/splash';

export default class Splash extends Component {
  static navigationOptions = {
    title: 'Band Sessions'
  };

  render() {
    return (
      <SplashBackground/>
    );
  }
}
