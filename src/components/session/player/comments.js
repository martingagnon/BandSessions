import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = 10;

class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {dimensions: undefined};
  }

  onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    if (!this.state.dimensions || width !== this.state.dimensions.width) {
      this.setState({...this.state, dimensions: {width, height}});
    }
  }

  positionStyle(comment) {
    const percentage = comment.time / this.props.playerDuration;
    const position = this.state.dimensions.width * percentage;
    return {position: 'absolute', left: position};
  }

  thumbsStyle(comment) {
    return {...this.positionStyle(comment), height: SIZE, borderRadius: SIZE / 2, width: SIZE};
  }

  thumbsUpElement(comment) {
    const style = {...this.positionStyle(comment)};
    return <Icon name="md-thumbs-up" style={style} size={SIZE} color="#94de45" key={comment.id}/>;
  }

  thumbsDownElement(comment) {
    const style = {...this.positionStyle(comment)};
    return <Icon name="md-thumbs-down" style={style} size={SIZE} color="#ff9c00" key={comment.id}/>;
  }

  commentElement(comment) {
    const style = {...this.positionStyle(comment)};
    return <Icon name="md-chatbubbles" style={style} size={SIZE} color="#000000" key={comment.id}/>;
  }

  createCommentElement(comment) {
    if (comment.emotion === 1) {
      return this.thumbsUpElement(comment);
    } else if (comment.emotion === -1) {
      return this.thumbsDownElement(comment);
    } else {
      return this.commentElement(comment);
    }
  }

  render() {
    const comments = this.props.comments[this.props.session.id];
    const {dimensions} = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
          {dimensions ? comments.map((comment) => this.createCommentElement(comment)) : undefined}
      </View>
    );
  }
}

Comments.propTypes = {
  session: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  playerDuration: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: SIZE * 2
  }
});

export default connect(
  state => ({...state.comments, ...state.player}))(Comments);
