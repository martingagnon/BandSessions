import React, {Component, PropTypes} from 'react';

import {ListView} from 'react-native';
import SessionItem from './session-item';

export default class SessionList extends Component {
  render() {
    const {dataSource, style} = this.props;
    return (
      <ListView dataSource={dataSource} style={style} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(item) => <SessionItem item={item} onPress={this.props.onPress} />} />
    );
  }
}

SessionList.propTypes = {
  dataSource: PropTypes.object.isRequired
};
