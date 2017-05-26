import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';
import colors from 'components/colors'

export default class ControlHolder extends Component {
  render() {
    return (
      <View style={styles.holder}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});
