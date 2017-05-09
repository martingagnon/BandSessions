import React, {Component} from 'react';

import {Image, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  memberImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 5
  }
});
