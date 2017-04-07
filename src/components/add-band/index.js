import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/add-band';

import {View} from 'react-native';
import {Button, Input} from 'nachos-ui';

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
      <View>
        <Input status="normal" placeholder="Band Name"
          value={this.state.bandName}
          onChangeText={value => this.setState({...this.state, bandName: value })}
        />

        {this.state.bandName.length > 2 ? (
        <Button kind="squared" onPress={() => this.onAddPressed()}>Add</Button>
        ) : (
        <Button kind="squared" disabled>Add</Button>
        )}
      </View>

    );
  }
}

AddBand.propTypes = {
  addBand: PropTypes.func.isRequired
};

export default connect(
  _state => ({}),
  dispatch => bindActionCreators(Actions, dispatch))(AddBand);
