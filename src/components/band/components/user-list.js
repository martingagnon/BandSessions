import React, {Component, PropTypes} from 'react';

import {View, Text, Image, ListView, StyleSheet, TouchableHighlight} from 'react-native';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(props.users)};
  }

  renderUser(user) {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectUser(user)}>
        <View style={styles.user} key={user.id}>
          <Image style={styles.image} source={{uri: user.picture}} />
          <Text>{user.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.users);
    return (
      <View style={this.props.style}>
        <ListView dataSource={dataSource} style={styles.list} automaticallyAdjustContentInsets={false} enableEmptySections={true} renderRow={(user) => this.renderUser(user)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  user: {
    height: 44,
    flexDirection: 'row'
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired
};
