import React, {Component} from 'react';

import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class RecordButton extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
          <Image style={styles.button}
            source={require('images/btn-record.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  button: {
    height: 54,
    width: 54,
    shadowOffset: {width: -2, height: -2},
    shadowRadius: 9,
    shadowColor: colors.shadow,
    shadowOpacity: 0.4,
    borderRadius: 24
  }
});
