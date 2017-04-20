import React, {Component} from 'react';

import {View, TouchableHighlight, Text} from 'react-native';
import {styles} from './styles.js';

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
