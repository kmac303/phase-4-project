import React, {useEffect, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Restaurant() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const history = useHistory();

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
  
    const { name, description, image_url, reviews } = restaurant;

  const handleEditReview = (reviewId) => {
    history.push(`/restaurants/${id}/edit/${reviewId}`);
  };

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={image_url} alt="restaurant"/>
      <br/>
      <Link to={`/restaurants/${id}/review`}>Leave a Review</Link>

      <h3>Reviews</h3>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <ul key={review.id}>
              <div className="card">
              <p>User ID: {review.user.username}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <button onClick={() => handleEditReview(review.id)}>Edit</button>
              </div>
            </ul>
          ))}
      </ul>
    </div>
  );
}

export default Restaurant;