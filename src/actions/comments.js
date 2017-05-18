import getCommentsService from 'services/firebase/comments';
import {COMMENT_EMOJI} from 'constants/comment-emojis';

export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

export const addComment = (session, comment, time, emoji, currentUser) => {
  return async () => {
    const service = getCommentsService(session.id);
    if (!emoji) {
      emoji = COMMENT_EMOJI;
    }
    await service.add({comment, time, emoji, user: currentUser.id});
  };
};

export const updateComments = (comments, sessionId) => {
  return {
    type: UPDATE_COMMENTS,
    comments,
    sessionId
  };
};
