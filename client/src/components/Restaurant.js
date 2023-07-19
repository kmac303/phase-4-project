import React, { useEffect, useState, useContext } from "react";
import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/restaurants/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        } else {
          throw new Error("Failed to fetch restaurant data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const hasUserReviewed = () => {
    if (!user) return false;
    return (restaurant.reviews ?? []).some(
      (review) => review.user.id === user.id
    );
  };

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

  const calculateAverageRating = () => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (accumulator, review) => accumulator + review.rating,
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    }
    return 0;
  };

  const getTotalReviewCount = () => {
    const reviewCount = reviews ? reviews.length : 0;
    return `${reviewCount} ${reviewCount === 1 ? "Review" : "Reviews"}`;
  };
  
  return (
    <div>
      <h2>{name}</h2>
      <h4>{description}</h4>
      <p><img
        src="https://www.freepnglogos.com/uploads/star-png/file-gold-star-svg-wikimedia-commons-6.png"
        alt="Small Star"
        style={{ width: "20px", height: "20px" }}
        />{calculateAverageRating()}  ({getTotalReviewCount()})
        </p>
        {/* <p>Total Reviews: {reviews ? reviews.length : 0}</p> Display total review count */}
      <img src={image_url} alt="restaurant" />
      <br />
      {user ? (
        hasUserReviewed() ? (
          <p>You have already submitted a review for this restaurant.</p>
        ) : (
          <Link to={`/restaurants/${id}/review/`}>Leave a Review</Link>
        )
      ) : (
        <p>Please sign in to leave a review</p>
      )}
      <h2>Reviews</h2>
      <ul>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ul key={review.id}>
              <div className="reviewCard">
                <p>Username: {review.user.username}</p>
                <p>Rating: <img
                src="https://www.freepnglogos.com/uploads/star-png/file-gold-star-svg-wikimedia-commons-6.png"
                alt="Small Star"  
                style={{ width: "20px", height: "20px" }}
                />{review.rating}</p>
                <p>Comment: {review.comment}</p>
                {user && user.id === review.user.id && (
                  <div>
                    <Link to={{ pathname: `/reviews/${review.id}/edit`, state: { review: review, restaurantName: name } }}>
                    <button>
                      Edit Your Review
                    </button>
                    </Link>
                    <button onClick={() => handleDeleteClick(review.id)}>
                      Delete Your Review
                    </button>
                  </div>
                )}
              </div>
            </ul>
          ))
        ) : (
          <div className="card">
          <p>No reviews left yet!</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Restaurant;
