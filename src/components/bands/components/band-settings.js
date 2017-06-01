import React, {Component} from 'react';

import {ImageButton} from 'ui';

export const addItem = {isAddItem: true};

export default class ListItem extends Component {
  render() {
    return (
      <ImageButton style={this.props.style} image={require('images/btn-invite-member-baked.png')} onPress={() => this.props.onPress(this.props.item)} />
    );
  }
}
