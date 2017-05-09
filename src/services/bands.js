import {service} from './base';
import mapper from './mappers/band';

export default function getBandsService(callback) {
  return service('bands', mapper, callback);
}
