import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Image} from 'react-native';

import styles from './styles.js';

export default class ListItem extends Component {
  render() {
    const selected = this.props.selected;
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
        <View style={styles.bandItem}>
          <Image
            style={styles.bandImage}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text style={ selected ? styles.selectedBandItemText : styles.bandItemText}>
            {this.props.item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
