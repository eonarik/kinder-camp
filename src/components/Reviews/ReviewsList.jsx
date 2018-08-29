import React, { Component } from 'react';

import { Container } from "flux/utils";
import ReviewsStore from "../../data/ReviewsStore";
import Actions from '../../data/Actions/reviews';

import ReviewsListItem from './ReviewsListItem';

class ReviewsList extends Component {

  static getStores() {
    return [ReviewsStore];
  }

  static calculateState(prevState) {
    return {
      onUpdateReview: Actions.updateReview,
      onAddReview: Actions.addReview,
      onReceiveReviewsList: Actions.receiveReviewsList,
      reviews: ReviewsStore.getState().get('reviews'),
    };
  }

  componentDidMount = () => {
    if (!this.state.reviews || !this.state.reviews.length) {
      this.state.onReceiveReviewsList();
    }
  }

  render() {
    let _reviews = [];

    for (let i in this.state.reviews) {
      let review = this.state.reviews[i];

      _reviews.push(
        <ReviewsListItem 
          key={review.id}
          obj={review}
          onUpdateReview={this.state.onUpdateReview}
          onAddReview={this.state.onAddReview}
        />
      );
    }

    return (
      <div className="reviews">
        {_reviews}
      </div>
    );
  }
}

export default Container.create(ReviewsList);