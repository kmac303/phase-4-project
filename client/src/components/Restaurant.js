import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import NewReviewForm from "./NewReviewForm";
import { Link } from "react-router-dom";
// import Card from 'react-bootstrap/Card';

function Restaurant({restaurants, setRestaurants}) {
    const { id } = useParams();
    // console.log(id)
    // const [restaurant, setRestaurant] = useState({});

        // Fetch restaurant data based on the ID
        useEffect(() => {
        //   const restaurantObj = restaurants.find(l => l.id == id)
        //     if (restaurantObj){
        //     setRestaurants(restaurantObj);
        //   }}, [restaurants]); 


        fetch(`http://localhost:3000/restaurants/${id}`)
          .then((response) => response.json())
          .then((restaurants) => setRestaurants(restaurants))}, [id]);

          console.log(restaurants);


      const { name, description, image_url } = restaurants;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={image_url}/>
      <Link to={`/restaurants/${id}/review`}>Leave a Review</Link>
    </div>
  );
}

export default Restaurant;