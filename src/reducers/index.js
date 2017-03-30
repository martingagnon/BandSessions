import { combineReducers } from 'redux';
import sessions from 'src/components/sessions/reducer';
import recordSession from 'src/components/record-session/reducer';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession
  });
};

export default rootReducer;
