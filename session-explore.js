import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SessionItem from './components/session-item.js'
import SessionsService from './services/sessions.js'

export default class SessionExplore extends Component {
  
  constructor(props) {
    super(props);
    this.state = {datasource: this.getDatasource([])};
    this.updateSession();
  }

  async updateSession() {
    const sessionService = new SessionsService();
    const sessions = await sessionService.getSessions();
    this.setState({datasource: this.getDatasource(sessions)});
  }

  getDatasource(sessions) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(sessions);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.datasource}
          renderRow={(sessionItem) => <SessionItem sessionItem={sessionItem} styles={styles.item}/> }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    color: 'red'
  }
});