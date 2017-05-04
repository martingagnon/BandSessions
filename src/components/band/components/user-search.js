import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as SearchActions from 'actions/search-users';
import * as MembersActions from 'actions/members';
import {MEMBER_ROLE} from 'constants/user-roles';

import {View, StyleSheet} from 'react-native';
import {Input} from 'nachos-ui';
import UserList from './user-list';

class UserSearch extends Component {
  static navigationOptions = {
    title: 'Bands'
  };

  constructor(props) {
    super(props);
    this.state = {query: ''};
  }

  onQueryChanged(query) {
    this.setState({...this.state, query});
    this.props.searchUsers(query);
  }

  onUserSelect(user) {
    this.setState({...this.state, query: ''});
    this.props.searchUsers('');
    this.props.addMember(this.props.band.id, user.id, MEMBER_ROLE);
  }

  render() {
    const users = this.props.users || [];
    const {query} = this.state;
    return (
      <View style={this.props.styles}>
          <Input status="normal" placeholder="Add your facebook friends" height={40}
            value={query}
            onChangeText={value => this.onQueryChanged(value)}
          />
          <UserList style={styles.searchResults} users={users} onSelectUser={(user) => this.onUserSelect(user)}/>
      </View>
    );
  }
}

UserSearch.propTypes = {
  users: PropTypes.array.isRequired,
  addMember: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  searchResults: {
    height: 100
  }
});

export default connect(
  state => ({...state.search}),
  dispatch => bindActionCreators(Object.assign(SearchActions, MembersActions), dispatch))(UserSearch);
