import React, { Component } from 'react';

import MyReviewsListItem from './MyReviewsListItem';

class MyReviewsList extends Component {
  render () {
    let _reviews = [];

    for (let i in this.props.reviews) {
      let review = this.props.reviews[i];
      _reviews.push(
        <MyReviewsListItem
          key={review.id}
          onUpdateReview={this.props.onUpdateReview}
          obj={review}
        />
      );
    }

    return (
      <div>
        {_reviews}
      </div>
    );
  }
}

export default MyReviewsList;