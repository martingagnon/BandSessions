import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../constants/styles.js');
const constants = styles.constants;
const {Text, View, TouchableHighlight} = ReactNative;

export default class ActionButton extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
