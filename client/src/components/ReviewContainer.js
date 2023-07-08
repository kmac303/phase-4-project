import React from "react";

function ReviewContainer({reviews}) {
  let sortedReviews = reviews.sort(function (a, b) {
    if (a.rating < b.rating) {
      return -1;
    }
    if (a.rating > b.rating) {
      return 1;
    }
    return 0;
  });
      const reviewCards = sortedReviews.map(review => {
        return <ReviewCard 
          key={review.id} 
          review={review} 
          />
      })
      
    return (
        <div>
          <h1>Locations:</h1>
                {reviewCards}
        </div>
    )
}

export default LocationContainer;