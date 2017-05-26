import React, {Component} from 'react';
import {View, TouchableHighlight} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import colors from 'components/colors';

export default class Row extends Component {
  render() {
    const {height, width, svg, onPress} = this.props;

    return (
      <TouchableHighlight underlayColor={colors.clear} onPress={() => onPress()} style={this.props.style}>
        <View>
          <SvgUri height={height.toString()} width={width.toString()} svgXmlData={svg} />
        </View>
      </TouchableHighlight>
    );
  }
}
