import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onLayout(event) {
    const {width, height} = event.nativeEvent.layout;
    if (!this.state.dimensions || width !== this.state.dimensions.width) {
      this.setState({...this.state, dimensions: {width, height}});
    }
  }

  render() {
    const {dimensions} = this.state;
    const imageStyle = dimensions ? dimensions : {};

    return (
      <View style={styles.screen} onLayout={(event) => this.onLayout(event)}>
        {dimensions ? (
          <Image source={require('images/bkg-blurred.png')}
            style={imageStyle} resizeMode="cover">
            {this.props.children}
          </Image>
        ) : (null)}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row'
  }
});
