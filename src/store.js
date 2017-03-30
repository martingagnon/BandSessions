import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

import * as sessionsService from './services/sessions';
import {updateSessions} from './components/sessions/actions';

export default function configureStore(navReducer) {

  const store = createStore(
    reducer(navReducer),
    {},
    applyMiddleware(thunk)
  );

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(reducer.default);
    });
  }

  sessionsService.observe((items) => store.dispatch(updateSessions(items)));

  return store;
}
