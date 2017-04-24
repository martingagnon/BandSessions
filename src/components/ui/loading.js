import React, {Component} from 'react';

import {Text, StyleSheet} from 'react-native';
import {Center} from 'ui';

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
    fontWeight: 'bold',
    fontSize: 50
  }
});
