import getCommentsService from 'services/comments';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

export const addComment = (session, comment, time, emotion) => {
  return async () => {
    const service = getCommentsService(session.id);
    await service.add({comment, time, emotion});
  };
};

export const updateComments = (comments, sessionId) => {
  return {
    type: UPDATE_COMMENTS,
    comments,
    sessionId
  };
};
