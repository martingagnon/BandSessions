import React, {Component, PropTypes} from 'react';
import {ListView} from 'react-native';

import ListItem from './list-item';

export default class SessionList extends Component {
  render() {
    const {dataSource} = this.props;
    return (
      <ListView dataSource={dataSource} enableEmptySections={true} renderRow={(item) => <ListItem item={item} />} />
    );
  }
}

SessionList.propTypes = {
  dataSource: PropTypes.object.isRequired
};
