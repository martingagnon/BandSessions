import { combineReducers } from 'redux';
import sessions from './sessions';
import recordSession from './record-session';

const rootReducer = combineReducers({
  sessions, recordSession
});

export default rootReducer;
