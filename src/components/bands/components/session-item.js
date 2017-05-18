import React, {Component} from 'react';

import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import colors from 'components/colors';

import {getTimeString} from 'services/utils';

export default class ListItem extends Component {
  render() {
    const time = getTimeString(this.props.item.duration);

    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.sessionItem}>
          <View style={styles.content}>
            <Text style={styles.sessionItemText}>{this.props.item.name}</Text>
            <Text style={styles.sessionTime}>{time}</Text>
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
    height: 70
  },
  sessionItemText: {
    color: colors.text,
    fontFamily: 'OpenSans-Semibold',
    fontSize: 15,
    paddingLeft: 50,
    flex: 1
  },
  sessionTime: {
    fontFamily: 'OpenSans',
    fontSize: 13,
    fontWeight: '300',
    marginRight: 12,
    color: colors.warmGrey
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingRight: 16,
    alignItems: 'center'
  },
  chevron: {
    marginTop: 1
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator
  }
});
