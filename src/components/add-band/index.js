import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/add-band';

import {Button, Input} from 'nachos-ui';
import Container from 'ui/container';

class AddBand extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
    this.state = {bandName: ''};
  }

  onAddPressed = () => {
    this.props.addBand(this.state.bandName);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Input status="normal" placeholder="Band Name"
          value={this.state.bandName}
          onChangeText={value => this.setState({...this.state, bandName: value })}
        />
        <Button kind="squared" onPress={() => this.onAddPressed()}
          disabled={this.state.bandName.length <= 2}>Add</Button>
      </Container>

    );
  }
}

AddBand.propTypes = {
  addBand: PropTypes.func.isRequired
};

export default connect(
  _state => ({}),
  dispatch => bindActionCreators(Actions, dispatch))(AddBand);
