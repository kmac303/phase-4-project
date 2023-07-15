import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function NewRestaurantForm({restaurants, setRestaurants}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image_url: ''
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  function handleAddRestaurant(newRestaurant) {
    const updatedRestaurantsArray = [...restaurants, newRestaurant];
    setRestaurants(updatedRestaurantsArray);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newRestaurant => {
        handleAddRestaurant(newRestaurant);
        history.push(`/restaurants`)
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      <button type="submit">Submit Restaurant</button>
    </form>
  );
};

export default NewRestaurantForm;