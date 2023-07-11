import React from "react";
// import Card from 'react-bootstrap/Card';
import RestaurantCard from "./RestaurantCard";

function RestaurantContainer({restaurants}) {
      const restaurantCards = restaurants.map(restaurant => {
        return <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          description={restaurant.description}
          image_url={restaurant.image_url}
        />
      })
      
    return (
        <div>
          <h2>Restaurants</h2>
          {restaurantCards}
        </div>
    )
}

export default RestaurantContainer;