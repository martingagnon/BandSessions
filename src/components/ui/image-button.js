import React, {Component} from 'react';
import {Image, TouchableHighlight} from 'react-native';

import colors from 'components/colors';

export default class Row extends Component {
  render() {
    const {onPress} = this.props;

    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => onPress()} style={this.props.style}>
        <Image source={this.props.image}/>
      </TouchableHighlight>
    );
  }
}
