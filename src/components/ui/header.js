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
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: colors.white
  }
});
