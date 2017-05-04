import React, {Component} from 'react';
import ReactNative from 'react-native';

import styles from './styles.js';

const {Image} = ReactNative;

export default class ListItem extends Component {
  render() {
    return (
      <Image
        style={styles.memberImage}
        source={{uri: this.props.item.picture}}
      />
    );
  }
}
