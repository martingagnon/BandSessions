import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Block extends Component {
  render() {
    return (
      <View style={styles.footer}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {height: 50}
});
