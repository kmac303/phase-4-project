import React, {useState} from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import Search from "./Search";

function RestaurantContainer({restaurants}) {
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(search.toLowerCase())) 
    || restaurant.description.toLowerCase().includes(search.toLowerCase())
    || restaurant.address.toLowerCase().includes(search.toLowerCase())
  })
  
    const restaurantCards = filteredRestaurants.map(restaurant => {
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
          <Search onSearch={setSearch}/>
          <br />
          <Link to="/restaurants/new">Add New Restaurant</Link>
          {restaurantCards}
        </div>
    )
}

export default RestaurantContainer;