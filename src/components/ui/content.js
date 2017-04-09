import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Content extends Component {
  render() {
    return (
      <View style={styles.content}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {flex: 1}
});
