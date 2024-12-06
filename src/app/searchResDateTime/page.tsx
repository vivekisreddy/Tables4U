'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use for query params
import axios from 'axios';

interface Restaurant {
  name: string;
  address: string;
  openTime: number;
  closeTime: number;
  availableTables: number[];
}

export default function SearchResDateTime() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.post(
          'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerSearchByDate',
          { date, time },
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Raw Backend Response:', response.data);

        // Parse the body of the backend response
        const parsedBody = JSON.parse(response.data.body);

        if (response.status === 200 && Array.isArray(parsedBody)) {
          setRestaurants(parsedBody); // Successfully parse and set the restaurants
          setMessage('');
        } else if (parsedBody.message) {
          setRestaurants([]);
          setMessage(parsedBody.message); // Show the backend message
        } else {
          setRestaurants([]);
          setMessage('No restaurants found for the selected date and time.');
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
        setMessage('Error fetching restaurants.');
      }
    };

    if (date && time) {
      fetchRestaurants();
    }
  }, [date, time]);

  return (
    <div className="restaurants-container">
      <h1>Available Restaurants</h1>
      {message && <p className="message">{message}</p>}
      {restaurants.length > 0 ? (
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
            {restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.openTime}</td>
                <td>{restaurant.closeTime}</td>
                <td>{restaurant.availableTables.join(', ')}</td>
                <td>
                  <button
                    className="make-reservation-button"
                    onClick={() => alert(`Make reservation for ${restaurant.name}`)}
                  >
                    Make Reservation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p className="message">Loading restaurants...</p>
      )}
    </div>
  );
}
