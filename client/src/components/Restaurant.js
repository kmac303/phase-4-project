import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const history = useHistory();
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

  const handleEditReview = (reviewId) => {
    history.push(`/reviews/${reviewId}/edit`);
  };

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
      <p>{description}</p>
      <p><img
        src="https://www.freepnglogos.com/uploads/star-png/file-gold-star-svg-wikimedia-commons-6.png"
        alt="Small Star"
        style={{ width: "20px", height: "20px" }}
        />{calculateAverageRating()}  ({getTotalReviewCount()})
        </p>
        {/* <p>Total Reviews: {reviews ? reviews.length : 0}</p> Display total review count */}
      <img src={image_url} alt="restaurant" />
      <br />
      {hasUserReviewed() ? (
        <p>You have already submitted a review for this restaurant.</p>
      ) : (
        <Link to={`/restaurants/${id}/review/`}>Leave a Review</Link>
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
                    <button onClick={() => handleEditReview(review.id)}>
                      Edit Your Review
                    </button>
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
