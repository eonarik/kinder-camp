import { 
  REVIEWS, 
} from "../../const/url";

import { 
  RECEIVE_REVIEWS_LIST,
  RECEIVE_COMMENTS_LIST,
} from "../ActionTypes.js";

import _Dispatcher from "../_Dispatcher.js";

import request from '../../inc/request';

let Actions = {};

Actions.receiveReviewsList = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(REVIEWS.LIST, {
      sort: 'createdon',
      dir: 'desc',
      ...options
    }, (response) => {
      _Dispatcher.dispatch({
        type: RECEIVE_REVIEWS_LIST,
        reviews: response.object
      });
      resolve(response.object);
    });
  });
};

Actions.receiveCommentsList = function (review_id, options = {}) {
  return new Promise((resolve, reject) => {
    request(REVIEWS.LIST, {
      sort: 'createdon',
      dir: 'asc',
      review_id,
      ...options
    }, (response) => {
      resolve(response.object);
    });
  });
};

Actions.updateReview = function (review_id, options = {}) {
  return new Promise((resolve, reject) => {
    request(REVIEWS.UPDATE, {
      id: review_id,
      ...options
    }, (response) => {
      if (response.success) {
        Actions.receiveReviewsList();
        resolve(response.object);
      }
    });
  });
};

Actions.addReview = function (options = {}) {
  return new Promise((resolve, reject) => {
    request(REVIEWS.CREATE, options, (response) => {
      if (response.success) {
        Actions.receiveReviewsList();
        resolve(response.object);
      }
    });
  });
};

export default Actions;