import { combineReducers } from 'redux';
import sessions from './sessions';
import session from './session';
import audioRecorder from './audio-recorder';
import player from './player';
import comments from './comments';
import bands from './bands';
import addSession from './add-session';
import currentUser from './current-user';
import band from './band';
import members from './members';
import search from './search';
import users from './users';

const rootReducer = (nav) => {
  return combineReducers({
    nav, sessions, audioRecorder, session, player, comments, bands, band, addSession, currentUser, members, search, users
  });
};

export default rootReducer;
