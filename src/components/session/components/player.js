import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';

import Sound from 'react-native-sound';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {audioPath: props.audioPath};
    this._play();
  }

  async _play() {
    setTimeout(() => {
      const sound = new Sound(this.state.audioPath, '', () => {});
      setTimeout(() => {
        sound.play();
      }, 100);
    }, 100);
  }

  render() {
    return (
      <View>
        <Text>Player</Text>
      </View>
    );
  }
}

Player.propTypes = {
  audioPath: PropTypes.string.isRequired
};
