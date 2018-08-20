import { 
  IMAGES, 
} from "../../const/url";

import request from '../../inc/request';

let Actions = {};

// files
Actions.receiveFilesList = function ({ camp_id, types }) {
  return new Promise((resolve, reject) => {
    request(IMAGES.LIST, {
      camp_id,
      types
    }, (response) => {
      resolve(response.object);
    });
  });
}
Actions.deleteFile = function (id) {
  return new Promise((resolve, reject) => {
    request(IMAGES.UPDATE, {
      id,
      delete: true,
    }, (response) => {
      resolve();
    });
  });
};
Actions.addFile = function ({ camp_id, file, type }) {
  return new Promise((resolve, reject) => {
    let post = new FormData();
    post.append('file', file);
    post.append('type_id', type);
    post.append('camp_id', camp_id);
    request(IMAGES.CREATE, post, (response) => {
      resolve(response.object);
    });
  });
};

export default Actions;