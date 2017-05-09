import React, {Component} from 'react';

import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.sessionItem}>
          <Text style={styles.sessionItemText}>{this.props.item.name}</Text>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  sessionItem: {
    backgroundColor: colors.clear,
    height: 49
  },
  sessionItemText: {
    color: colors.text,
    fontSize: 15,
    paddingLeft: 50,
    marginTop: 17,
    marginBottom: 17
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator
  }
});
