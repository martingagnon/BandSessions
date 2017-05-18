import {service} from './base';
import mapper from './mappers/comment';

export default function getCommentsService(sessionId, callback) {
  return service(`comments/${sessionId}`, mapper, callback);
}
