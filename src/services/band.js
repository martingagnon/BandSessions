import {service} from './base';

const mapper = (child) => {
  return {
    name: child.val().name,
    id: child.key
  };
};

export default function getBandService(bandId, callback) {
  return service(`bands/${bandId}`, mapper, callback);
}
