import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({id, name, description, image_url}) {
    return (
        <div className="card">
            <Link to={`/restaurants/${id}`}>
            <img src={image_url} alt="Restaurant"/>
                 <ul>
                    <h4>{name}</h4>
                </ul>
            <p>{description}</p>
            </Link>
        </div>
      )
}

export default RestaurantCard;