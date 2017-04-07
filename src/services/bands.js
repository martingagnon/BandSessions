import {service} from './base';

const mapper = (child) => {
  return {
    name: child.val().name,
    key: child.key
  };
};

export const bandService = service('bands', mapper);
