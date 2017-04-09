import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Row extends Component {

  render() {
    return (
      <View style={styles.row}>
        {this.props.children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
