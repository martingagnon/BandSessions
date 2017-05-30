import React, {Component} from 'react';

import {View, Image, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.holder}>
        <Image source={require('images/logo.png')}/>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  holder: {
    flex: 1,
    backgroundColor: colors.clear,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
