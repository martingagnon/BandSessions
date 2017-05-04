import React, {Component} from 'react';
import ReactNative from 'react-native';

import styles from './styles.js';

const {View, TouchableHighlight, Text} = ReactNative;

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.sessionItem}>
          <Text style={styles.sessionItemText}>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
