import React, {Component} from 'react';

import {Text, StyleSheet} from 'react-native';
import {Center} from 'ui';
import colors from 'components/colors';

export default class Loading extends Component {
  render() {
    const progress = Math.ceil(this.props.progress * 100);

    return (
      <Center>
        <Text style={styles.text}>{progress}%</Text>
      </Center>
    );
  }
}

export const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 50,
    color: colors.white,
    backgroundColor: colors.clear
  }
});
