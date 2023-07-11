import React from "react";
// import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function RestaurantCard({id, name, description, image_url}) {
    return (
        <div>
            <Link to={`/restaurants/${id}`}>
                 <ul>
                    <h4>{name}</h4>
                </ul>
            </Link>
            <p>{description}</p>
            <img src={image_url}/>
        </div>
      )
}

export default RestaurantCard;