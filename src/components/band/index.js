import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/bands';

import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Screen, Header, Content, Button, NavigationButton} from 'ui';
import BandPicture from './components/band-picture'
import Members from './components/members';
import colors from 'components/colors';

class Band extends Component {
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
    if (this.state.bandName.length > 0) {
      this.props.addBand(this.state.bandName);
    }
  }

  onDeletePressed() {
    // Todo
  }

  invitePressed() {
    // Todo
  }

  onGoBack() {
    this.props.navigation.goBack();
  }

  onImage() {
  }

  addButton() {
    return <NavigationButton onPress={() => this.onAddPressed()}>Create</NavigationButton>;
  }

  deleteButton() {
    return <NavigationButton onPress={() => this.onDeletePressed()}>Delete</NavigationButton>;
  }

  render() {
    const {bandName, band, isCreate} = this.state;
    const bandPicture = band ? band.picture : null
    const title = isCreate ? 'New Band' : 'Edit Band';
    const rightView = isCreate ? this.addButton() : this.deleteButton();

    return (
      <Screen>
        <Header onGoBack={() => this.onGoBack()} rightView={rightView}>{title}</Header>
        <View style={styles.header}>
          <BandPicture style={styles.picture} onPress={() => this.onImage()} picture={bandPicture}/>
          <Text style={styles.selectText} >Tap to select picture</Text>
        </View>
        <View style={styles.textHolder}>
          <TextInput style={styles.textInput} placeholder="Band Name"
            value={this.state.bandName}
            onChangeText={bandName => this.setState({...this.state, bandName })}/>
        </View>
        {band ? (
          <Content>
            <Members style={styles.members} band={band}/>
            <View style={styles.footer}>
              <Button style={styles.inviteButton} onPress={() => this.invitePressed()}>Invite members</Button>
            </View>
          </Content>
          ) : (
            <View style={styles.body}/>
          )
        }
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: 'center'
  },
  members: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: colors.white
  },
  textHolder: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 60,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.paleGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: 25,
    fontSize: 20,
    fontFamily: 'OpenSans',
    color: colors.black,
    maxHeight: 35,
    flex: 1
  },
  footer: {
    height: 60
  },
  inviteButton: {
    height: 60,
    flex: 1
  },
  selectText: {
    marginTop: 8,
    fontFamily: 'OpenSans',
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.white,
    backgroundColor: colors.clear
  },
  picture: {
    marginTop: 20
  }
});

Band.propTypes = {
  addBand: PropTypes.func.isRequired,
  newBand: PropTypes.func.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Actions, dispatch))(Band);
