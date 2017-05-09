import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {SVGButton} from 'ui';
import colors from 'components/colors';

const BUTTON_SIZE = 18;

export default class Header extends Component {
  renderGoBack() {
    return <SVGButton height={BUTTON_SIZE} width={BUTTON_SIZE} svg={require('images/icn-back.svg')} onPress={this.props.onGoBack}/>;
  }

  renderClose() {
    return <SVGButton style={styles.closeButton} height={BUTTON_SIZE} width={BUTTON_SIZE} svg={require('images/icn-close.svg')} onPress={this.props.onClose}/>;
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.buttonView}>
          {this.props.onGoBack ? this.renderGoBack() : null}
        </View>
        <Text style={styles.text}>{this.props.children}</Text>
        <View style={styles.buttonView}>
          {this.props.onClose ? this.renderClose() : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    height: 38,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    fontFamily: 'OpenSans',
    color: colors.white,
    backgroundColor: colors.clear
  },
  buttonView: {
    margin: 10,
    height: 18,
    width: 18,
    flex: 2
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
});
