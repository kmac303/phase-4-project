import React, { useState, useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext";


function NewReviewForm({restaurants, setRestaurants}) {
  const {user} = useContext(UserContext);
  const { id } = useParams()
  // console.log(user)


  const history = useHistory();
  const [formData, setFormData] = useState({
    rating: '5',
    comment: '',  
    user_id: user.id,
    restaurant_id: parseInt(id)
  });

  console.log(formData)


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
    console.log(formData)
    fetch(`/restaurants/${formData.restaurant_id}/reviews`, {
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
      <div>
      </div>
        <label>
        Rating:  
        <select id="rating" name="rating" value={formData.rating} onChange={handleInputChange}>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
        </select>
      </label>
      <br />
      <label>
        Comment:
        <input
          type="text"
          name="comment"
          value={formData.comment}
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