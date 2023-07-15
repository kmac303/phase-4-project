import React, {useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom';

function EditReview({restaurants, setRestaurants}) {
  console.log(restaurants);

  const restaurant = useLocation()
  const history = useHistory();
  const review = restaurant.state;
  const [formData, setFormData] = useState({
    rating: review.rating,
    comment: review.comment,  
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  function handleEditReview(review, restaurantId) {
    let restaurant = restaurants.find(res => res.id === restaurantId)
    let newReviews = restaurant.reviews.map(r => r.id === review.id ? review : r)
    restaurant.reviews = newReviews;
    let newRestaurants = restaurants.map(res => res.id === restaurantId ? restaurant : res)
    setRestaurants(newRestaurants);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/restaurants/:id/${review.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        handleEditReview(data, review.restaurant_id)
        history.push(`/restaurants/${review.restaurant_id}`)
      })
      .catch(error => console.error(error));
  };
  
    return ( 
        <div>
        <form onSubmit={handleSubmit}>
        <label>
        Rating:
        <select id="rating" name="number" value={formData.rating} onChange={handleInputChange}>
            <option value=''></option>
            <option value='one'>1</option>
            <option value='two'>2</option>
            <option value='three'>3</option>
            <option value='four'>4</option>
            <option value='five'>5</option>
        </select>
      </label>
      <br />
      <label>
        Comment:
        <input
          type="text"
          name="description"
          value={formData.comment}
          onChange={handleInputChange}
        />
    </label>
      <br />
      <button type="submit">Update Review</button>
    </form>
        </div>
     );
}

export default EditReview;