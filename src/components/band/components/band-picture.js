import React, {Component} from 'react';

import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors'

import {DEFAULT_BAND_PICTURE} from 'constants/bands'

export default class BandPicture extends Component {
  render() {
    const bandPicture = this.props.picture || DEFAULT_BAND_PICTURE
    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress()}>
        <View style={this.props.style}>
          <Image
            style={styles.picture}
            source={{uri: bandPicture}}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.black
  }
});
