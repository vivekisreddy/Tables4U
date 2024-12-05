'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import axios from 'axios';

interface Restaurant {
  restaurantID: string;
  name: string;
  address: string;
  openTime: number;
  closeTime: number;
  isActive: number;
}

export default function Home() {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input
  const router = useRouter(); // instance for page routing programmatically

  // Handle Search for restaurant by name
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      setMessage('Please enter a restaurant name to search.');
      return;
    }

    try {
      // Sending the name directly in the body of the request
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerSearchByRes',
        { name: searchQuery }, // Directly send the name in the body
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Check if the response status is OK and process the response
      if (response.status === 200) {
        const restaurantData = JSON.parse(response.data.body);

        if (restaurantData && restaurantData.restaurant) {
          setRestaurantList([restaurantData.restaurant]); // Show the searched restaurant
          setMessage('');

          // Use URL constructor to build the URL with query params
          const url = new URL('/consumerSearchResDetails', window.location.origin);
          url.searchParams.append('restaurantData', JSON.stringify(restaurantData.restaurant));

          // Redirect to the consumerSearchResDetails page
          router.push(url.toString());
        } else {
          setRestaurantList([]);
          setMessage('No restaurant found with that name.');
        }
      } else {
        setMessage('Failed to search for the restaurant.');
      }
    } catch (error) {
      console.error('Error searching for the restaurant:', error);
      setMessage('Error searching for the restaurant.');
    }
  };

  function adminLogIn() {
    router.push('/adminLogIn');
  }

  function managerLogIn() {
    router.push('/managerLogIn');
  }

  return (
    <div className="main-container">
      {/* Header Rectangle */}
      <header className="header">
        <div className="header-left">
          <button className="adminLogInButton" onClick={adminLogIn}>
            Admin Log In
          </button>
          <button className="managerLogInButton" onClick={managerLogIn}>
            Manager Log In
          </button>
        </div>
        <div className="header-center">
          <h1>Tables4U</h1>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}

      {/* Consumer Dashboard Section */}
      <div className="consumer-dashboard">
        <h2 className="title">Consumer Dashboard</h2>

        {/* Buttons for listing restaurants */}
        <div className="button-container">
          <button
            className="listRestaurantsButton"
            onClick={() => router.push('/consumerListActiveRes')} // Navigate to ActiveRestaurants page
          >
            List Active Restaurants
          </button>
        </div>
      </div>

      {/* Reservation Confirmation Section */}
      <div className="reservation-section">
        <h3>Already have a reservation?</h3>
        <p>Find your details here!</p>
        <button className="findReservationDetailsButton">
          Find Restaurant Details
        </button>
      </div>
    </div>
  );
}