'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();

  // Handle Search for restaurant by name
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setMessage('Please enter a restaurant name to search.');
      return;
    }

    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerSearchByRes',
        { name: searchQuery },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const restaurantData = JSON.parse(response.data.body);
        if (restaurantData && restaurantData.restaurant) {
          // Redirect to the consumerSearchResDetails page with restaurant details
          router.push(
            `/consumerSearchResDetails?restaurantData=${encodeURIComponent(
              JSON.stringify(restaurantData.restaurant)
            )}`
          );
        } else {
          setMessage('No active restaurants found with that name.');
        }
      } else {
        setMessage('Failed to search for the restaurant.');
      }
    } catch (error) {
      console.error('Error searching for the restaurant:', error);
      setMessage('Error searching for the restaurant.');
    }
  };

  const handleSearchByDateTime = (event: React.FormEvent) => {
    event.preventDefault();
    if (!date || !time) {
      setMessage('Please enter both date and time to search.');
      return;
    }
    router.push(`/searchResDateTime?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
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
            placeholder="Search for an active restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {/* Date and Time Input Section */}
      <div className="date-time-container">
        <h2>Search by Date and Time</h2>
        <form onSubmit={handleSearchByDateTime} className="date-time-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="time-input"
              min="0"
              max="24"
              placeholder="Enter time (0-24)"
              required
            />
          </div>
          <button type="submit" className="search-button">
            Submit
          </button>
        </form>
      </div>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}

      {/* Consumer Dashboard Section */}
      <div className="consumer-dashboard">
        <h2 className="title">Consumer Dashboard</h2>
        <div className="button-container">
          <button
            className="listRestaurantsButton"
            onClick={() => router.push('/consumerListActiveRes')}
          >
            List Active Restaurants
          </button>
        </div>
      </div>

      

      {/* Reservation Confirmation Section */}
      <div className="reservation-section">
        <h3>Already have a reservation?</h3>
        <p>Find your details here!</p>
        <button className="findReservationDetailsButton">Find Restaurant Details</button>
      </div>
    </div>
  );
}