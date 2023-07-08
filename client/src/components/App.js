import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import './App.css';
import Login from './Login';
import NavBar from "./NavBar";
import Home from "./Home";
import SignUp from "./SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((r) => r.json())
      .then((reviews) => setReviews(reviews)); 
  }, []); 

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user}/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route exact path="/restaurants">
          <ReviewContainer reviews={reviews}/>
          </Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
