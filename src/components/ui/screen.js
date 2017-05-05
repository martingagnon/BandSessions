import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Screen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        {this.props.children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#382c6d'
  }
});
