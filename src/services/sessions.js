import {service} from './base';

const mapper = (child) => {
  return {
    name: child.val().name,
    audio: child.val().audio,
    key: child.key
  };
};

export const sessionService = service('sessions', mapper);
