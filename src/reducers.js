import { combineReducers } from 'redux';
import sessions from 'src/components/sessions/reducer';
import session from 'src/components/session/reducer';
import recordSession from 'src/components/record-session/reducer';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession, session
  });
};

export default rootReducer;
