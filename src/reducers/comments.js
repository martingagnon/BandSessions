import { UPDATE_COMMENTS } from 'actions/comments';

const initialState = {comments: {}};

export default function sessions(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMMENTS:
      const sessionId = action.sessionId;
      action.comments.sort((commentA, commentB) => commentA.time - commentB.time);
      const comments = action.comments;
      return {...state, comments: {...state.comments, [sessionId]: comments}};
    default:
      return state;
  }
}
