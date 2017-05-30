import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ImagePicker from 'react-native-image-picker';
import * as Actions from 'actions/bands';
import * as BandActions from 'actions/band';

import {View, Text, TextInput, Keyboard, StyleSheet} from 'react-native';
import {Screen, Header, Content, Button, NavigationButton} from 'ui';
import BandPicture from './components/band-picture'
import Members from './components/members';
import colors from 'components/colors';

const ImagePickerOptions = {
  title: 'Select Band Picture',
  storageOptions: {
    skipBackup: true
  }
};

class Band extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
    const band = props.navigation.state.params.band;
    const isCreate = !band;
    const bandName = band ? band.name : ''
    const bandPicture = band ? band.picture : undefined

    this.state = {bandName, band, bandPicture, isCreate};
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
      Keyboard.dismiss();
      this.props.addBand(this.state.bandName, this.state.bandPicture);
    }
  }

  onDeletePressed() {
    this.props.deleteBand(this.state.band);
    this.props.navigation.goBack();
  }

  invitePressed() {
    // Todo
  }

  onGoBack() {
    if (this.state.band && this.state.bandName !== this.state.band.name) {
      this.props.updateBandName(this.state.band, this.state.bandName);
    }

    this.props.navigation.goBack();
  }

  onImage() {
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      if (!response.didCancel && !response.error) {
        this.setState({...this.state, bandPicture: response.uri})
        if (!this.state.isCreate) {
          this.props.updateBandImage(this.state.band, response.uri);
        }
      }
    });
  }

  addButton() {
    return <NavigationButton onPress={() => this.onAddPressed()}>Create</NavigationButton>;
  }

  deleteButton() {
    return <NavigationButton onPress={() => this.onDeletePressed()}>Delete</NavigationButton>;
  }

  render() {
    const {bandName, band, bandPicture, isCreate} = this.state;
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
            value={bandName}
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
  updateBandImage: PropTypes.func.isRequired,
  updateBandName: PropTypes.func.isRequired,
  deleteBand: PropTypes.func.isRequired,
  addBand: PropTypes.func.isRequired,
  newBand: PropTypes.func.isRequired
};

export default connect(
  state => (state.bands),
  dispatch => bindActionCreators(Object.assign(Actions, BandActions), dispatch))(Band);
