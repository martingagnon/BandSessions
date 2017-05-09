import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class Screen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Image source={require('images/bkg-blurred.png')}>
          {this.props.children}
        </Image>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row'
  }
});
