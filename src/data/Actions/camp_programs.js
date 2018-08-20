import { 
  CAMP_PROGRAM, 
} from "../../const/url";

import request from '../../inc/request';

let Actions = {};

// camp_program
Actions.addProgramToCamp = function ({ program_id, camp_id }) {
  return new Promise((resolve, reject) => {
    request(CAMP_PROGRAM.CREATE, {
      program_id,
      camp_id
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteProgramToCamp = function ({ program_id, camp_id }) {
  return new Promise((resolve, reject) => {
    request(CAMP_PROGRAM.UPDATE, {
      program_id,
      camp_id,
      deleted: true
    }, (response) => {
      resolve();
    });
  });
}

export default Actions;