import React, {useState, useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom';

function EditReview({restaurants, setRestaurants}) {
  const restaurant = useLocation()
  const history = useHistory();
  const review = restaurant?.state ?? {};
  const [formData, setFormData] = useState({
    rating: review.rating || '',
    comment: review.comment || '',  
  });
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/restaurants/${review.restaurant_id}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurantName(data.name);
        } else {
          throw new Error('Failed to fetch restaurant data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantData();
  }, [review.restaurant_id]);

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
    fetch(`/reviews/${review.id}`, {
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
          {restaurantName && <h2>{restaurantName}</h2>}
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
      <button type="submit">Update Review</button>
    </form>
        </div>
     );
}

export default EditReview;