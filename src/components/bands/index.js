import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ListView} from 'react-native';

import * as Actions from 'actions/bands';
import getBandsService from 'services/bands';

import {Button} from 'nachos-ui';
import BandList from './components/band-list';
import {Container, Content, Block} from 'ui';

class Bands extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
    const service = getBandsService((bands) => props.updateBands(bands));
    this.state = {service, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillMount() {
    this.state.service.observe();
  }

  componentWillUnmount() {
    this.state.service.stopObserving();
  }

  onAddPressed = () => {
    this.props.navigation.navigate('AddBand');
  }

  onBandPressed = (band) => {
    const navigate = this.props.navigation.navigate;
    navigate('Sessions', {band});
  };

  render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.bands);
    return (
      <Container>
        <Content>
          <BandList dataSource={dataSource} onPress={(band) => {
            this.onBandPressed(band);
          }}/>
        </Content>
        <Block>
          <Button kind="squared" iconName="md-add-circle" onPress={() => this.onAddPressed()}/>
        </Block>
      </Container>
    );
  }
}

Bands.propTypes = {
  bands: PropTypes.array.isRequired,
  updateBands: PropTypes.func.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
