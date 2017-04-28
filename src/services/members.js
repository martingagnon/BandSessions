import {service} from './base';
import mapper from './mappers/member';

export default function getMembersService(bandId, callback) {
  return service(`members/${bandId}`, mapper, callback);
}
