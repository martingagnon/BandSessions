import React, {Component} from 'react';

import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import colors from 'components/colors';

export const addItem = {isAddItem: true};

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.addBandItem}>
          <Text style={styles.addBandItemText}>+</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  addBandItemText: {
    color: colors.white,
    fontSize: 11,
    marginTop: 4
  },
  addBandItem: {
    width: 80,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
