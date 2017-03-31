import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

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

  return store;
}
