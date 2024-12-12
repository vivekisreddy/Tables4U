'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // To handle navigation

interface Restaurant {
  name: string;
  address: string;
  openTime: number; // Assuming it's an integer representing hours (1, 2, 3, etc.)
  closeTime: number; // Assuming it's an integer representing hours (1, 2, 3, etc.)
  availableTables: number[]; // Array of available table IDs or counts
  isActive: number; // Assuming 1 for active, 0 for inactive
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
        const restaurantData = JSON.parse(response.data.body);
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
        <div className="header-center-activate">
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
              <th>Available Tables</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.openTime}</td> {/* Display open time as a simple number */}
                <td>{restaurant.closeTime}</td> {/* Display close time as a simple number */}
                <td>{restaurant.availableTables.join(', ')}</td>
                <td>
                  <button
                    className="make-reservation-button"
                    onClick={() =>
                      router.push(
                        `/makeReservation?name=${encodeURIComponent(
                          restaurant.name
                        )}`
                      )
                    }
                  >
                    Make Reservation
                  </button>
                </td>
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