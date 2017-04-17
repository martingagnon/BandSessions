import {service} from './base';

const mapper = (child) => {
  return {
    name: child.val().name,
    id: child.key
  };
};

export default function getBandsService(callback) {
  return service('bands', mapper, callback);
}
