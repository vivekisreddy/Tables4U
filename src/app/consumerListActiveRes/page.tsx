'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // To handle navigation

interface Restaurant {
  name: string;
  address: string;
  openTime: number;
  closeTime: number;
  isActive: number;
}

const ActiveRestaurantsPage = () => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // List active restaurants from API
  const listRestaurants = async () => {
    try {
      const response = await axios.get(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerListRes',
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        let restaurantData = response.data;
        restaurantData = JSON.parse(restaurantData.body);
        setRestaurantList(restaurantData);
      } else {
        throw new Error('Failed to load restaurants.');
      }
    } catch (error) {
      console.error('Error listing restaurants:', error);
      setMessage('Error loading restaurants.');
    }
  };

  useEffect(() => {
    listRestaurants();
  }, []);

  return (
    <div className="active-restaurants-container">
      <header className="header">
        <div className="header-left">
          <button onClick={() => router.push('/')}>Back to Home</button>
        </div>
        <div className="header-center">
          <h1>Active Restaurants</h1>
        </div>
      </header>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}

      {/* Display restaurants */}
      {restaurantList.length > 0 ? (
        <table className="restaurant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Open Time</th>
              <th>Close Time</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((restaurant, index) => (
              <tr key={index}> {/* Use index as the key */}
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.openTime}</td>
                <td>{restaurant.closeTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No active restaurants available.</p>
      )}
    </div>
  );
};

export default ActiveRestaurantsPage;
