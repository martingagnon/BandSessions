import {service} from './base';
import mapper from './mappers/comment';

export const getCommentService = (session) => {
  return service(`sessions/${session.key}/comments`, mapper);
};
