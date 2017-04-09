import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/sessions';

import BandList from './components/band-list';
import {Container, Content, Block} from 'ui';
import {Button} from 'nachos-ui';

class Bands extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
  }

  onAddPressed = () => {
    this.props.navigation.navigate('AddBand');
  }

  onBandPressed = (band) => {
    const navigate = this.props.navigation.navigate;
    navigate('Sessions', {band});
  };

  render() {
    return (
      <Container>
        <Content>
          <BandList dataSource={this.props.dataSource} onPress={(band) => {
            this.onBandPressed(band);
          }}/>
        </Content>
        <Block>
          <Button kind="squared" onPress={() => this.onAddPressed()}>Add</Button>
        </Block>
      </Container>
    );
  }
}

Bands.propTypes = {
  dataSource: PropTypes.object.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
