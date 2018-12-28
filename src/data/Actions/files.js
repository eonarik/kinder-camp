import { 
  IMAGES, 
} from "../../const/url";

import request from '../../inc/request';

let Actions = {};

// files
Actions.receiveFilesList = function ({ resource_id, types }) {
  return new Promise((resolve, reject) => {
    request(IMAGES.LIST, {
      resource_id,
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
Actions.addFile = function ({ resource_id, file, type }) {
  return new Promise((resolve, reject) => {
    let post = new FormData();
    post.append('file', file);
    post.append('type_id', type);
    post.append('resource_id', resource_id);
    request(IMAGES.CREATE, post, (response) => {
      resolve(response.object);
    });
  });
};

export default Actions;