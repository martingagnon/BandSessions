import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import Sound from 'react-native-sound';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this._play();

    this.state = {audioPath: 'http://cdn.online-convert.com/example-file/audio/example.aac'};
  }

  async _play() {
      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      const sound = new Sound(this.state.audioPath, '', () => {});
      setTimeout(() => {
        sound.play();
      }, 100);
    }, 100);
  }

  render() {
    return (<View></View>);
  }
}

Player.propTypes = {
  session: PropTypes.object.isRequired
};
