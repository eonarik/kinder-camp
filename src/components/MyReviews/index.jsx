import React, { Component } from 'react';

import { Container } from "flux/utils";
import ReviewsStore from "../../data/ReviewsStore";
import Actions from '../../data/Actions/reviews';

import MyReviewsList from './MyReviewsList';

class MyReviews extends Component {
  static getStores() {
    return [ReviewsStore];
  }

  static calculateState(prevState) {
    return {
      onUpdateReview: Actions.updateReview,
      // onAddReview: Actions.addReview,
      onReceiveReviewsList: Actions.receiveReviewsList,
      reviews: ReviewsStore.getState().get('reviews'),
    };
  }

  componentDidMount = () => {
    if (!this.state.reviews || !this.state.reviews.length) {
      this.state.onReceiveReviewsList();
    }
  }

  render () {
    return (
      <div>
        <h4 className="text-success">Мои отзывы</h4>

        <MyReviewsList
          onUpdateReview={this.state.onUpdateReview}
          reviews={this.state.reviews}
        />
      </div>
    );
  }
}

export default Container.create(MyReviews);