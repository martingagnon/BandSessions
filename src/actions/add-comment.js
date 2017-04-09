import {getCommentService} from 'services/comments';

export const addComment = (session, comment, time, emotion) => {
  return async () => {
    const service = getCommentService(session);
    await service.add({comment, time, emotion});
  };
};
