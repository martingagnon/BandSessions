import React, {Component, PropTypes} from 'react';
import {ListView} from 'react-native';

import BandItem from './band-item';

export default class BandList extends Component {
  render() {
    const {dataSource} = this.props;
    return (
      <ListView dataSource={dataSource} enableEmptySections={true} renderRow={(item) => <BandItem item={item} onPress={this.props.onPress} />} />
    );
  }
}

BandList.propTypes = {
  dataSource: PropTypes.object.isRequired
};
