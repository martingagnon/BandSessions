import React, {Component} from 'react';

import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import colors from 'components/colors';

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.sessionItem}>
          <View style={styles.content}>
            <Text style={styles.sessionItemText}>{this.props.item.name}</Text>
            <SvgUri style={styles.chevron} width="9" height="17" source={require('images/list-arrow.svg')} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  sessionItem: {
    backgroundColor: colors.clear,
    height: 42
  },
  sessionItemText: {
    color: colors.text,
    fontFamily: 'OpenSans-Semibold',
    fontSize: 15,
    paddingLeft: 50,
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingRight: 16
  },
  chevron: {
    marginTop: 3
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator
  }
});
