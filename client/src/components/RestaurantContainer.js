import React, {useState, useContext} from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import Search from "./Search";
import { UserContext } from "../context/UserContext";

function RestaurantContainer({restaurants}) {
  const {user} = useContext(UserContext);
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(search.toLowerCase())) 
    || restaurant.description.toLowerCase().includes(search.toLowerCase())
    || restaurant.address.toLowerCase().includes(search.toLowerCase())
  })
  
    const restaurantCards = filteredRestaurants.map(restaurant => {
      console.log(restaurant)
      // return <div></div>
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
          {user && <Link to="/restaurants/new">Add New Restaurant</Link>}
          {!user && <h3>Please Sign Up or Login to Add a New Restaurant</h3>}
          {restaurantCards}
        </div>
    )
}

export default RestaurantContainer;