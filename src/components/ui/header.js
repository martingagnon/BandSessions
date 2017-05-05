import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    height: 38,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 18,
    fontFamily: 'OpenSans',
    color: colors.white,
    backgroundColor: colors.clear
  }
});
