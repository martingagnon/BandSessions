import React, {Component} from 'react';

import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors'

export default class BandPicture extends Component {
  render() {
    const bandPicture = this.props.picture ? {uri: this.props.picture} : require('images/icn-band-placeholder-baked.png');
    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress()}>
        <View style={this.props.style}>
          <Image
            style={styles.picture}
            source={bandPicture}
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
    borderRadius: 60
  }
});
