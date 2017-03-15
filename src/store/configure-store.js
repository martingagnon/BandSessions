import { createStore } from 'redux';
import reducer from '../reducers';

import * as sessionsService from '../services/sessions';
import {updateSessions} from '../actions/sessions';

export default function configureStore() {
  const store = createStore(
    reducer,
    {}
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sessionsService.observe((items) => {
    setTimeout(() => {
      store.dispatch(updateSessions(items));
    }, 1);
  });

  return store;
}
