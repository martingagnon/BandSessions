import {service} from './base';
import mapper from './mappers/session';

export const sessionService = service('sessions', mapper);
