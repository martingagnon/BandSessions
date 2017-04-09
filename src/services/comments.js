import {service} from './base';

const mapper = (child) => {
  return {
    comment: child.val().comment,
    time: child.val().time,
    emotion: child.val().emotion,
    key: child.key
  };
};

export const getCommentService = (session) => {
  return service(`sessions/${session.key}/comments`, mapper);
};
