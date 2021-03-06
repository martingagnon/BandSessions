import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {BOOKMARK_EMOJI} from 'constants/comment-emojis';

import {View, Text, ListView, Image} from 'react-native';
import {Content} from 'ui';

import styles from './styles';

const DISPLAY_SECONDS = 5;

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillReceiveProps({comments, currentTime}) {
    const allSessionComments = (comments[this.props.session.id] || []);
    const sessionComments = allSessionComments.filter((comment) => Math.abs(currentTime - comment.time) <= DISPLAY_SECONDS && comment.emoji !== BOOKMARK_EMOJI);
    const dataSource = this.state.dataSource.cloneWithRows(sessionComments);

    this.setState({...this.state, dataSource});
  }

  renderComment(comment) {
    const user = this.props.users[comment.user];
    if (!user) return (<View></View>);
    return (
      <View style={styles.comment}>
        <Image
          style={styles.thumbnail}
          source={{uri: user.picture}}
        />
        <View>
          <View style={styles.nameIcon}>
            <Text style={styles.name}>{`${user.name}`} - {comment.emoji}</Text>
          </View>
          <Text>{`${comment.comment}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Content>
        <ListView dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          renderRow={(comment) => this.renderComment(comment)} />
      </Content>
    );
  }
}

Comments.propTypes = {
  session: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired
};

export default connect(
  state => ({...state.player, ...state.comments, ...state.users}),
  dispatch => bindActionCreators({}, dispatch))(Comments);
