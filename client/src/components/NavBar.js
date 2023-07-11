import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <div>
        <NavLink to="/">Home</NavLink>
        <br/>
        <NavLink to="/restaurants">Restaurants</NavLink>
        {/* <RestaurantContainer restaurants={restaurants} setRestaurants={setRestaurants}/> */}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink>
            <br />
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
