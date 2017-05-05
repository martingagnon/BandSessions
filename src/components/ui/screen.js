import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import colors from 'components/colors';

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
    flex: 1
  }
});
