import {service} from './base';
import mapper from './mappers/member';

export default function getMemberService(bandId, userId, callback) {
  return service(`members/${bandId}/${userId}`, mapper, callback);
}
