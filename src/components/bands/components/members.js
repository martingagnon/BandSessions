import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import getMembersService from 'services/members';
import * as Actions from 'actions/members';
import {getBandUsers} from 'services/utils/users.js';

import {View, ListView, StyleSheet} from 'react-native';
import MemberItem from './member-item';
import styles from './styles';

class Members extends Component {
  constructor(props) {
    super(props);
    const service = this.getServiceForProps(props);
    this.state = {service, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillUpdate(nextProps) {
    if (nextProps.band.id !== this.props.band.id) {
      this.state.service.stopObserving();
      const service = this.getServiceForProps(nextProps);
      service.observe();
      this.setState(...this.state, service);
    }
  }

  getServiceForProps(props) {
    const bandId = props.band.id;
    const service = getMembersService(bandId, (members) => props.updateMembers(members, bandId));
    return service;
  }

  componentWillMount() {
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  getUsers() {
    const {users, members, band} = this.props;
    return getBandUsers(band.id, members, users);
  }

  render() {
    const users = this.getUsers();
    const dataSource = this.state.dataSource.cloneWithRows(users);

    return (
      <ListView dataSource={dataSource} horizontal={true} style={styles.memberList} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(item) => <MemberItem item={item} />} />
    );
  }
}

Members.propTypes = {
  members: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  band: PropTypes.object.isRequired,
  updateMembers: PropTypes.func.isRequired
};

export default connect(
  state => ({...state.members, ...state.users}),
  dispatch => bindActionCreators(Actions, dispatch))(Members);
