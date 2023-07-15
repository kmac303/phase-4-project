import React from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

function RestaurantContainer({restaurants}) {
      const restaurantCards = restaurants.map(restaurant => {
        return <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          image_url={restaurant.image_url}
        />
      })
      
    return (
        <div>
          <h2>Restaurants</h2>
          <Link to="/restaurants/new">Add New Restaurant</Link>
          {restaurantCards}
        </div>
    )
}

export default RestaurantContainer;