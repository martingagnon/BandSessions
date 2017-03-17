import React, {Component, PropTypes} from 'react';
import {Modal, View} from 'react-native';

import {styles} from './styles';

import Player from '../player/player'

export default class ShowSessionModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {visible} = this.props;

    return (
      <Modal animationType={'slide'} transparent={false} visible={visible} >
       <View style={styles.container}>
        <Player></Player>         
       </View>
      </Modal>
    );
  }
}

ShowSessionModal.propTypes = {
  session: PropTypes.object.isRequired
};
