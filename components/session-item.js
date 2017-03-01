import React, { Component } from 'react';

import {
  Text
} from 'react-native';


export default class SessionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {active: true};
  }

  render() {
    return (
      <Text style={this.props.styles}>{this.props.sessionItem.name}</Text>
    );    
  }
}
