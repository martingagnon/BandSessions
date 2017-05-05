import React, {Component} from 'react';

import {View, TouchableHighlight, Text, Image, StyleSheet} from 'react-native';

import colors from 'components/colors.js';

const DEFAULT_IMAGE_URI = 'https://facebook.github.io/react/img/logo_og.png';

export default class ListItem extends Component {
  render() {
    const selected = this.props.selected;
    const {band} = this.props;
    const imageUri = band.picture ? band.picture : DEFAULT_IMAGE_URI;

    return (
      <TouchableHighlight onPress={() => this.props.onPress(band)}>
        <View style={styles.bandItem}>
          <Image
            style={styles.bandImage}
            source={{uri: imageUri}}
          />
          <Text style={ selected ? styles.selectedBandItemText : styles.bandItemText}>
            {band.name}
          </Text>
          <View style={ selected ? styles.selectedLine : styles.line} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  bandItem: {
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center'
  },
  bandItemText: {
    color: colors.white,
    fontSize: 11,
    marginTop: 4
  },
  selectedBandItemText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4
  },
  bandImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  selectedLine: {
    height: 2,
    backgroundColor: colors.white,
    alignSelf: 'stretch'
  },
  line: {
    height: 1,
    backgroundColor: colors.white,
    alignSelf: 'stretch'
  }
});
