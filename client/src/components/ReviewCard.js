import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function ReviewCard({review}) {

    const {id, rating, comment, user_id, restaurant_id} = location;

    return (
        <ul >
            <Card>
                <Card.Img variant="top" src={image_url} />
                <Card.Body>
                    <Card.Title><h2>{city}, {state}</h2></Card.Title>
                    <Link to={`/locations/${id}`}>See Venues and Location Details</Link>
                </Card.Body>
            </Card>
            <br/>
            <p></p>
        </ul>
    )
}

export default LocationCard;