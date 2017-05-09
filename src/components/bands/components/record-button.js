import React, {Component} from 'react';

import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class RecordButton extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress(this.props.item)}>
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
    shadowOffset: {width: 1, height: -1},
    shadowRadius: 10,
    shadowColor: colors.shadow,
    shadowOpacity: 0.9,
    borderRadius: 27
  }
});
