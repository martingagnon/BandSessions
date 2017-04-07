import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import recordSession from './record-session';
import player from './player';
import addComment from './add-comment';
import bands from './bands';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession, session, player, addComment, bands
  });
};

export default rootReducer;
