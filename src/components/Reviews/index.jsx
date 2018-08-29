import React, { Component } from 'react';

import ReviewsList from './ReviewsList';

class Reviews extends Component {
  render() {
    return (
      <div>
        <h4 className="text-success">Отзывы и статистика</h4>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ReviewsList />
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;