import React, {Component} from 'react';
import firebase from '../services/firebase';

import styles from '../constants/styles.js';
import ListItem from './list-item';
import ActionButton from './buttons/button';

import {
  ListView,
  AlertIOS,
  View
} from 'react-native';

export default class ItemsScene extends Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    dataSource = dataSource.cloneWithRows([]);
    this.state = {dataSource};
  }

  componentDidMount() {
    const self = this;
    firebase.observeItems((items) => {
      self.setState({dataSource: self.state.dataSource.cloneWithRows(items)});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} > </ListView>

        <ActionButton title="Add" onPress={this._addItem}>
        </ActionButton>
      </View>
    );
  }

  _renderRow(item) {
    return (
      <ListItem item={item} />
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            firebase.addItem({title: text});
          }
        }
      ],
      'plain-text'
    );
  }
}
