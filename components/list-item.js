import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../constants/styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
