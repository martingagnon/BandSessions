import React, {Component, PropTypes} from 'react';
import {ListView} from 'react-native';

import SessionItem from './session-item';

export default class SessionList extends Component {
  render() {
    const {dataSource} = this.props;
    return (
      <ListView dataSource={dataSource} enableEmptySections={true} renderRow={(item) => <SessionItem item={item} />} />
    );
  }
}

SessionList.propTypes = {
  dataSource: PropTypes.object.isRequired
};
