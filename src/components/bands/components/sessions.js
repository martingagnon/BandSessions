import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import getSessionsService from 'services/sessions';
import * as Actions from 'actions/sessions';

import {View, ListView, StyleSheet} from 'react-native';
import SessionItem from './session-item';
import colors from 'components/colors';

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
    const {sessions, band} = this.props;
    const bandSessions = sessions[band.id] || [];
    const dataSource = this.state.dataSource.cloneWithRows(bandSessions);

    return (
      <View style={this.props.style}>
        <ListView dataSource={dataSource} style={styles.sessionsList} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(item) => <SessionItem item={item} onPress={this.props.onPress} />} />
      </View>
    );
  }
}

Sessions.propTypes = {
  band: PropTypes.object.isRequired,
  updateSessions: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  sessionsList: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});

export default connect(
  state => (state.sessions),
  dispatch => bindActionCreators(Actions, dispatch))(Sessions);
