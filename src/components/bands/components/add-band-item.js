import React, {Component} from 'react';

import {ImageButton} from 'ui';

export const addItem = {isAddItem: true};

export default class AddBandItem extends Component {
  render() {
    const buttonStyle = {marginLeft: 5};
    return (
      <ImageButton style={buttonStyle} image={require('images/btn-add-band-baked.png')} onPress={() => this.props.onPress(this.props.item)} />
    );
  }
}
