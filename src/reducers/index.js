import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import recordSession from './record-session';
import player from './player';
import addComment from './add-comment';
import bands from './bands';
import addSession from './add-session';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession, session, player, addComment, bands, addSession
  });
};

export default rootReducer;
