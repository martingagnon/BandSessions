import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from 'components/constants.js';

export default class Container extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 5,
    justifyContent: 'space-between'
  }
});
