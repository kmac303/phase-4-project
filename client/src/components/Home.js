import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
// import RestaurantContainer from "./RestaurantContainer";

function Home() {
  const {user} = useContext(UserContext);
  // console.log(user)

    if (user) {
      return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h5>Want to leave a review? Click Restaurants first!</h5>
      {/* <RestaurantContainer restaurants={restaurants} setRestaurants={setRestaurants}/> */}
    </div>
    )} else {
      return (
      <>
        <h1>Welcome to RestaurantReviews.com</h1>
        <h5>Please Login or Create an Account to Leave a Review</h5>
      </>
    )}
  }
  
  export default Home;
  