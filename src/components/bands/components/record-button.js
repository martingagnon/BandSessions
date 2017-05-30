import React, {Component} from 'react';

import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class RecordButton extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableHighlight underlayColor={colors.clear} onPress={() => this.props.onPress(this.props.item)}>
          <Image style={styles.button}
            source={require('images/btn-record-floating.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  button: {
    height: 54,
    width: 54
  }
});
