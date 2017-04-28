import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import getBandsService from 'services/bands';

import * as BandsActions from 'actions/bands';
import * as BandActions from 'actions/band';
import {addItem} from './add-band-item';

import {ListView} from 'react-native';
import BandItem from './band-item';
import AddBandItem from './add-band-item';
import styles from './styles';

class Bands extends Component {
  constructor(props) {
    super(props);
    const service = getBandsService((bands) => props.updateBands(bands));
    this.state = {service, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([addItem])};
  }

  componentWillUpdate(nextProps) {
    const {band} = this.props;
    const {bands} = nextProps;
    if (!band && bands.length > 0) {
      this.props.setBand(bands[0]);
    }
  }

  componentWillMount() {
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  selectBand(band) {
    this.props.setBand(band);
  }

  renderItem(item) {
    const {band} = this.props;

    if (item === addItem) {
      return <AddBandItem item={item} onPress={this.props.onAdd} />;
    } else {
      return <BandItem item={item} selected={item === band} onPress={(band) => this.selectBand(band)} />;
    }
  }

  render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.bands.concat(addItem));
    return (
      <ListView style={styles.bandList} horizontal={true} dataSource={dataSource} enableEmptySections={true} renderRow={(item) => this.renderItem(item)} />
    );
  }
}

Bands.propTypes = {
  onAdd: PropTypes.func.isRequired,
  bands: PropTypes.array.isRequired,
  updateBands: PropTypes.func.isRequired,
  setBand: PropTypes.func.isRequired
};

export default connect(
  state => ({...state.bands, ...state.band}),
  dispatch => bindActionCreators(Object.assign(BandActions, BandsActions), dispatch))(Bands);
