import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/members';
import getMembersService from 'services/firebase/members';
import {getBandUsers} from 'services/utils/users.js';

import {View, Text, Image, ListView, StyleSheet} from 'react-native';

class Members extends Component {
  constructor(props) {
    super(props);
    const service = this.getServiceForProps(props);
    this.state = {service, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.band.id !== this.props.band.id) {
      this.state.service.stopObserving();
      const service = this.getServiceForProps(nextProps);
      service.observe();
      this.setState({...this.state, service});
    }
  }

  getServiceForProps(props) {
    const bandId = props.band.id;
    const service = getMembersService(bandId, (members) => props.updateMembers(members, bandId));
    return service;
  }

  componentWillMount() {
    if (this.state.service) {
      this.state.service.observe();
    }
  }

  componentWillUnmount() {
    if (this.state.service) {
      this.state.service.stopObserving();
    }
  }

  renderMember(member) {
    return (
      <View style={styles.user}>
        <Image style={styles.image} source={{uri: member.picture}} />
        <Text>{member.name}</Text>
      </View>
    );
  }

  getUsers() {
    const {users, members, band} = this.props;
    return getBandUsers(band.id, members, users);
  }

  render() {
    const users = this.getUsers();
    const dataSource = this.state.dataSource.cloneWithRows(users);

    return (
      <View style={this.props.style}>
        <ListView dataSource={dataSource} style={styles.list} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(user) => this.renderMember(user)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#cfcfcf'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  user: {
    flexDirection: 'row'
  }
});

export default connect(
  state => ({...state.members, ...state.users}),
  dispatch => bindActionCreators(Actions, dispatch))(Members);
