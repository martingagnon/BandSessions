import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import {AppNavigator} from './components/navigation';

import configureStore from './store';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
const store = configureStore(navReducer);

@connect(state => ({nav: state.nav}))
class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

export default function BandSession() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
