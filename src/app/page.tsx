'use client'

// pages/index.tsx or any page component inside pages/
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
  const [showActiveOnly, setShowActiveOnly] = useState(false); 
  const [message, setMessage] = useState('');

  const router = useRouter(); // instance for page routing programmatically 

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
        setMessage('Restaurants loaded successfully!');
      } else {
        throw new Error('Failed to load restaurants.');
      }
    } catch (error) {
      console.error('Error listing restaurants:', error);
      setMessage('Error loading restaurants.');
    }
  };

  const toggleActiveRestaurants = () => {
    setShowActiveOnly(!showActiveOnly);
    setMessage(
      showActiveOnly ? 'Showing all restaurants.' : 'Showing only active restaurants.'
    );
  };

  const displayedRestaurants = showActiveOnly
    ? restaurantList.filter((restaurant) => restaurant.isActive === 1)
    : restaurantList;

  const handleFindDetails = (and: any) => {
    and.preventDefault();
    router.push("/consumerViewReservation");  // Correct usage of router.push() for navigation
  };

  // brings admin to the admin log in page
  function adminLogIn() {
    router.push('/adminLogIn');  // Correct usage of router.push()
  }

  function managerLogIn() {
    router.push('/managerLogIn');  // Correct usage of router.push()
    //submit comment comment comment
    // whatever comment comment
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

      {/* Consumer Dashboard Section */}
      <div className="consumer-dashboard">
        <h2 className="title">Consumer Dashboard</h2>

        {/* Buttons for listing restaurants */}
        <div className="button-container">
          <button className="listRestaurantsButton" onClick={listRestaurants}>
            List Active Restaurants
          </button>
          {restaurantList.length > 0 && (
            <button className="toggleRestaurantsButton" onClick={toggleActiveRestaurants}>
              {showActiveOnly ? 'Show All Restaurants' : 'Show Active Restaurants'}
            </button>
          )}
        </div>

        {/* Display message */}
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
                {showActiveOnly && <th>Status</th>}
              </tr>
            </thead>
            <tbody>
              {displayedRestaurants.map((restaurant, index) => (
                <tr key={restaurant.restaurantID || index}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.openTime}</td>
                  <td>{restaurant.closeTime}</td>
                  {showActiveOnly && <td>Active</td>}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          message && message !== 'Restaurants loaded successfully!' && (
            <p className="message">{message}</p>
          )
        )}
      </div>

      {/* Reservation Confirmation Section */}
      <div className="reservation-section">
        <h3>Already have a reservation?</h3>
        <p>Find your details here!</p>
        <button className="findReservationDetailsButton" onClick={handleFindDetails}>
          Find Restaurant Details
        </button>
      </div>
    </div>
  );
}
