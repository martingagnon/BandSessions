import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import colors from 'components/colors';

export default class Button extends Component {
  render() {
    const {disabled} = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.clear} onPress={disabled ? null : this.props.onPress} style={this.props.style}>
        <View style={disabled ? styles.disabled : styles.button}>
          <Text style={styles.text}>
            {this.props.children}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.barney,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled: {
    backgroundColor: colors.barney,
    opacity: 0.6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.white,
    fontFamily: 'OpenSans',
    fontSize: 16
  }
});
