import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SessionList extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
	      <Text>This is Session List!</Text>
	      <Text>{this.props.text}</Text>
    </View>
    )
  }
}