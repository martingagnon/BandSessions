import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

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
    flex: 1,
    padding: 5,
    justifyContent: 'space-between'
  }
});
