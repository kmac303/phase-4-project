import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

function NewReviewForm({ restaurants, setRestaurants }) {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    rating: '5',
    comment: '',
    user_id: null,
    restaurant_id: parseInt(id)
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/restaurants/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        } else {
          throw new Error('Failed to fetch restaurant data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: user.id
      }));
    }
  }, [user]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  function handleAddReview(newReview, restaurantId) {
    let restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    restaurant.reviews = [...restaurant.reviews, newReview];
    let newRestaurants = restaurants.map(r => r.id === parseInt(restaurantId) ? restaurant : r);
    setRestaurants(newRestaurants);
  }

  function submissionError() {
    return (
            window.confirm("Please make sure all sections are filled to submit a review!")
    );
  }
  
  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    fetch(`/restaurants/${formData.restaurant_id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => 
        {
          if (response.ok){
            return response.json()
          } else {
            return undefined;
          }
        })
      .then(newReview => {
        if (newReview) {
          handleAddReview(newReview, formData.restaurant_id);
          history.push(`/restaurants/${formData.restaurant_id}`);
        } else {
          submissionError();
        }
      })
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default NewReviewForm;