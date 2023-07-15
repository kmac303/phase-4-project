import React, {useEffect, useState, useContext} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Restaurant() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const history = useHistory();
    const {user} = useContext(UserContext);

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

    const handleDeleteClick = (reviewId) => {
      fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      })
        .then(() => {
          setRestaurant((prevRestaurant) => ({
            ...prevRestaurant,
            reviews: prevRestaurant.reviews.filter((r) => r.id !== reviewId),
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const { name, description, image_url, reviews } = restaurant;

  const handleEditReview = (reviewId) => {
    history.push(`/reviews/${reviewId}/edit`);
  };

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={image_url} alt="restaurant" />
      <br />
      <Link to={`/reviews/${id}/review/`}>Leave a Review</Link>

      <h3>Reviews</h3>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <ul key={review.id}>
              <div className="card">
                <p>User ID: {review.user.username}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                {user && user.id === review.user.id && (
                  <div>
                    <button onClick={() => handleEditReview(review.id)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(review.id)}
                    >
                      Delete Review
                    </button>
                  </div>
                )}
              </div>
            </ul>
          ))}
      </ul>
    </div>
  );
}

export default Restaurant;