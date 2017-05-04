import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import getSessionsService from 'services/sessions';
import * as Actions from 'actions/sessions';

import {ListView} from 'react-native';
import SessionItem from './session-item';
import styles from './styles';

class Sessions extends Component {
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
      this.setState(...this.state, service);
    }
  }

  getServiceForProps(props) {
    const bandId = props.band.id;
    const service = getSessionsService(bandId, (sessions) => props.updateSessions(sessions, bandId));
    return service;
  }

  componentWillMount() {
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  render() {
    const bandSessions = this.props.sessions[this.props.band.id] || [];
    const dataSource = this.state.dataSource.cloneWithRows(bandSessions);

    return (
      <ListView dataSource={dataSource} style={styles.sessionList} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(item) => <SessionItem item={item} onPress={this.props.onPress} />} />
    );
  }
}

Sessions.propTypes = {
  band: PropTypes.object.isRequired,
  updateSessions: PropTypes.func.isRequired
};

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(Actions, dispatch))(Sessions);
