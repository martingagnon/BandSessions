import React, {Component} from 'react';

import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import colors from 'components/colors';

export const addItem = {isAddItem: true};

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress(this.props.item)}>
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
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 16,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
