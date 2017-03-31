import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import recordSession from './record-session';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession, session
  });
};

export default rootReducer;
