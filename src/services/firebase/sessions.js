import {service} from './base';
import mapper from './mappers/session';

export default function getSessionsService(bandId, callback) {
  return service(`sessions/${bandId}`, mapper, callback);
}
