import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet} from 'react-native';

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
    if (this.props.playerDuration > 0) {
      const percentage = comment.time / this.props.playerDuration;
      const position = (this.state.dimensions.width * percentage);
      return {position: 'absolute', left: position, fontSize: 10};
    }
    return {position: 'absolute'};
  }

  createCommentElement(comment) {
    const style = {...this.positionStyle(comment), shadowOffset: {width: 1, height: -1}, shadowRadius: 4, shadowColor: '#875c8b', shadowOpacity: 0.4};
    return <Text style={style} key={comment.id}>{comment.emoji}</Text>;
  }

  getComments() {
    const {comments, session} = this.props;
    return comments[session.id] || [];
  }

  render() {
    const comments = this.getComments();
    const {dimensions} = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
          {dimensions ? comments.map((comment) => this.createCommentElement(comment)) : <View></View>}
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
    height: 20
  }
});

export default connect(
  state => ({...state.comments, ...state.player}))(Comments);
