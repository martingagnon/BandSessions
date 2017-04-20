import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {View, Text, ListView} from 'react-native';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillReceiveProps({comments, currentTime}) {
    const allSessionComments = (comments[this.props.session.id] || []);
    const sessionComments = allSessionComments.filter((comment) => Math.abs(currentTime - comment.time) <= 5);
    const dataSource = this.state.dataSource.cloneWithRows(sessionComments);

    this.setState({...this.state, dataSource});
  }

  renderComment(comment) {
    return (
      <View>
        <Text>{`${comment.emotion} ${comment.comment}`}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          renderRow={(comment) => this.renderComment(comment)} />
      </View>
    );
  }
}

Comments.propTypes = {
  session: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired
};

export default connect(
  state => ({...state.player, ...state.comments}),
  dispatch => bindActionCreators({}, dispatch))(Comments);
