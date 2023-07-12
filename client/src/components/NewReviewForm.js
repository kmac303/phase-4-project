import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function NewReviewForm({restaurants, setRestaurants}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',  
    restaurant_id: 1
  });

  const restaurantObj = restaurants.map((r) => {
    return <option key={r.rating} value={r.id}>
            {r.rating}
            </option>
  }
 )

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  function handleAddReview(newReview, restaurantId) {
    let restaurant = restaurants.find(r => r.id === parseInt(restaurantId))
    console.log(restaurant);
    restaurant.reviews = [...restaurant.reviews, newReview];
    let newRestaurants = restaurants.map(r => r.id === parseInt(restaurantId) ? restaurant : r)
    console.log(newRestaurants);
    setRestaurants(newRestaurants);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/restaurants/:id/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newReview => {
        handleAddReview(newReview, formData.restaurant_id)
        history.push(`/restaurants/${formData.restaurant_id}`)
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
        Rating:
        <select id="rating" name="number" onChange={handleInputChange}>
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
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      <button type="submit">Leave Review</button>
    </form>
  );
};

export default NewReviewForm;