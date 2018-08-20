import { host, apiPrefix } from '../config';

export const CAMPS = {
  CREATE: host + apiPrefix + 'camps/create',
  UPDATE: host + apiPrefix + 'camps/update',
  LIST: host + apiPrefix + 'camps/list',
};
export const IMAGES = {
  CREATE: host + apiPrefix + 'camps/images/create',
  UPDATE: host + apiPrefix + 'camps/images/update',
  LIST: host + apiPrefix + 'camps/images/list',
};
export const PROGRAMS = {
  CREATE: host + apiPrefix + 'camps/programs/create',
  UPDATE: host + apiPrefix + 'camps/programs/update',
  LIST: host + apiPrefix + 'camps/programs/list',
};
export const TARIFFS = {
  CREATE: host + apiPrefix + 'camps/tariffs/create',
  UPDATE: host + apiPrefix + 'camps/tariffs/update',
  LIST: host + apiPrefix + 'camps/tariffs/list',
};
export const TAGS = {
  UPDATE: host + apiPrefix + 'camps/tags/update',
};
export const STATUSES = {
  LIST: host + apiPrefix + 'camps/statuses/list',
};
export const CAMP_PROGRAM = {
  CREATE: host + apiPrefix + 'camps/camp_program/create',
  UPDATE: host + apiPrefix + 'camps/camp_program/update',
  LIST: host + apiPrefix + 'camps/camp_program/list',
};
export const PARAMS = {
  CREATE: host + apiPrefix + 'camps/params/create',
  UPDATE: host + apiPrefix + 'camps/params/update',
  LIST: host + apiPrefix + 'camps/params/list',
};
export const USERS = {
  OWN_PROFILE: host + apiPrefix + 'users/own_profile',
  UPDATE: host + apiPrefix + 'users/update',
};
export const VACANCIES = {
  CREATE: host + apiPrefix + 'vacancies/create',
  UPDATE: host + apiPrefix + 'vacancies/update',
  LIST: host + apiPrefix + 'vacancies/list',
};
export const RESERVATIONS = {
  CREATE: host + apiPrefix + 'reservations/create',
  UPDATE: host + apiPrefix + 'reservations/update',
  LIST: host + apiPrefix + 'reservations/list',
};