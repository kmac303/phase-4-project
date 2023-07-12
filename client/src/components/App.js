import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";
import Restaurant from "./Restaurant";
import RestaurantContainer from "./RestaurantContainer";
import NewReviewForm from "./NewReviewForm";

function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/restaurants")
      .then((r) => r.json())
      .then((restaurants) => setRestaurants(restaurants)); 
  }, []); 

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      {/* <main> */}
        {/* <Router> */}
        <Switch>
          <Route exact path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/">
            <Home user={user} restaurants={restaurants}/>
          </Route>
          <Route exact path="/restaurants">
            <RestaurantContainer restaurants={restaurants} setRestaurants={setRestaurants}/>
          </Route>
          <Route exact path="/restaurants/:id">
            <Restaurant restaurants={restaurants} setRestaurants={setRestaurants}/>
          </Route>
          <Route path="/restaurants/:id/review">
            <NewReviewForm restaurants={restaurants} setRestaurants={setRestaurants}/>
          </Route>
        </Switch>
        {/* </Router> */}
      {/* </main> */}
    </div>
  );
}

export default App;
