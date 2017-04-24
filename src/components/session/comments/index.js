import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {View, Text, ListView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Content, Row} from 'ui';

import styles from './styles';

const DISPLAY_SECONDS = 5;
const SIZE = 15;

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows([])};
  }

  componentWillReceiveProps({comments, currentTime}) {
    const allSessionComments = (comments[this.props.session.id] || []);
    const sessionComments = allSessionComments.filter((comment) => Math.abs(currentTime - comment.time) <= DISPLAY_SECONDS);
    const dataSource = this.state.dataSource.cloneWithRows(sessionComments);

    this.setState({...this.state, dataSource});
  }

  thumbsUpElement() {
    return <Icon name="md-thumbs-up" size={SIZE} color="#94de45"/>;
  }

  thumbsDownElement() {
    return <Icon name="md-thumbs-down" size={SIZE} color="#ff9c00"/>;
  }

  commentElement() {
    return <Icon name="md-chatbubbles" size={SIZE} color="#000000"/>;
  }

  iconElement(comment) {
    if (comment.emotion === 1) {
      return this.thumbsUpElement(comment);
    } else if (comment.emotion === -1) {
      return this.thumbsDownElement(comment);
    } else {
      return this.commentElement(comment);
    }
  }

  renderComment(comment) {
    return (
      <View style={styles.comment}>
        <Image
          style={styles.thumbnail}
          source={{uri: comment.user.picture.data.url}}
        />
        <View>
          <View style={styles.nameIcon}>
            <Text style={styles.name}>{`${comment.user.name}`}</Text>
            {this.iconElement(comment)}
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
  state => ({...state.player, ...state.comments}),
  dispatch => bindActionCreators({}, dispatch))(Comments);
