import React, {Component} from 'react';
import ReactNative from 'react-native';

import {styles, constants} from './styles';

const {Text, View, TouchableHighlight} = ReactNative;

export default class ActionButton extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.underlayColor}
          onPress={this.props.onPress}>
          <Text style={styles.text}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
