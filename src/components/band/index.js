import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/bands';

import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'nachos-ui';
import {Content} from 'ui';
import UserSearch from './components/user-search';
import Members from './components/members';

class AddBand extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
    const band = props.navigation.state.params.band;
    const isCreate = !band;
    this.state = {bandName: band ? band.name : '', band, isCreate};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastCreatedBand) {
      this.setState({...this.state, band: nextProps.lastCreatedBand, isCreate: false});
    }
  }

  componentDidMount() {
    this.props.newBand();
  }

  onAddPressed() {
    this.props.addBand(this.state.bandName);
  }

  render() {
    const {bandName, band, isCreate} = this.state;
    return (
      <Content>
        <View style={styles.header}>
          {isCreate ? (
            <Button kind="squared" onPress={() => this.onAddPressed()}
              disabled={this.state.bandName.length <= 2}>Add</Button>
            ) : (null)
          }
        </View>
        <Input status="normal" placeholder="Band Name"
          value={bandName}
          onChangeText={value => this.setState({...this.state, bandName: value })} height={60} />
        {band ? (
          <Content>
            <UserSearch style={styles.userSearch} band={band}/>
            <Members style={styles.members} band={band}/>
          </Content>
          ) : (null)
        }
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 238,
    backgroundColor: '#c720e7'
  },
  userSearch: {
    top: 0,
    position: 'absolute',
    zIndex: 1
  },
  members: {
    flex: 1
  }
});

AddBand.propTypes = {
  addBand: PropTypes.func.isRequired,
  newBand: PropTypes.func.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Actions, dispatch))(AddBand);
