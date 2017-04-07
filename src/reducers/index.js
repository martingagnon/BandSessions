import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import recordSession from './record-session';
import player from './player';
import addComment from './add-comment';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, recordSession, session, player, addComment
  });
};

export default rootReducer;
