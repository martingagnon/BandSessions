import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';

import * as Actions from 'actions/sessions';

import BandList from './components/band-list';
import {styles} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

class Bands extends Component {
  static navigationOptions = {
    title: 'Bands',
    header: ({navigate}) => {
      return {right: <Icon.Button name="plus" backgroundColor="#3b5998" onPress={() => navigate('AddBand')} />};
    }
  };

  constructor(props) {
    super(props);
  }

  onBandPressed = (band) => {
    const navigate = this.props.navigation.navigate;
    navigate('Sessions', {band});
  };

  render() {
    return (
      <View style={styles.container}>
        <BandList dataSource={this.props.dataSource} onPress={(band) => {
          this.onBandPressed(band);
        }}/>
      </View>
    );
  }
}

Bands.propTypes = {
  dataSource: PropTypes.object.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Actions, dispatch))(Bands);
