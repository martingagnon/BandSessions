import {service} from './base';
import mapper from './mappers/band';

export default function getBandService(bandId, callback) {
  return service(`bands/${bandId}`, mapper, callback);
}
