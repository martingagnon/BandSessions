import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors.js';

export default class NavigationButton extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress()}>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>{this.props.children}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export const styles = StyleSheet.create({
  actionButton: {
    height: 30,
    width: 110,
    borderRadius: 100,
    backgroundColor: colors.barneyTwo,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  actionButtonText: {
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: colors.white
  }
});
