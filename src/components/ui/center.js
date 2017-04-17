import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Container extends Component {

  render() {
    return (
      <View style={styles.center}>
        {this.props.children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
