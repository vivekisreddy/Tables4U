'use client'

import React, {useState} from 'react';
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
  // initial instantiation of landing home page
  const [redraw, forceRedraw] = React.useState(0)

  const instance = axios.create({
    baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
  });

  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
  const [showActiveOnly, setShowActiveOnly] = useState(false); 
  const [message, setMessage] = useState('');

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

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

// Toggle between showing all or only active restaurants
const toggleActiveRestaurants = () => {
    setShowActiveOnly(!showActiveOnly);
    setMessage(
        showActiveOnly ? 'Showing all restaurants.' : 'Showing only active restaurants.'
    );
};

// Filter restaurants dynamically based on active status
const displayedRestaurants = showActiveOnly
    ? restaurantList.filter((restaurant) => restaurant.isActive === 1)
    : restaurantList;

  const handleFindDetails = (and:any) => {
    and.preventDefault();
    window.location.replace("/consumerViewReservation")
    andRefreshDisplay()
  }

  // brings admin to the admin log in page
  function adminLogIn() {
    window.location.replace("/adminLogIn")
    andRefreshDisplay()
  }

  // brings manager to the manager log in page
  function managerLogIn() {
    window.location.replace("/managerLogIn")
    andRefreshDisplay()
  }

  // below is where the GUI for the landing home page is drawn
  return (
    <div>
      <button className="adminLogInButton" onClick={(e) => adminLogIn()} >Admin Log In</button>
      <button className="managerLogInButton" onClick={(e) => managerLogIn()} >Manager Log In</button>

      <label className="welcomeMessage">{"Welcome to Tables4U!"}</label>
      <label className="reservationMessage">{"Make a reservation:"}</label>

      <label className="confirmMessage">{"Already have a reservation? Find details here!"}</label>

      <form className="handleFindDetails" onSubmit={handleFindDetails}>
        <button type="submit" className="findReservationDetailsButton">Find Reservation Details</button>
      </form>

      <div className="consumer-container">
            <h1 className="title">Consumer Dashboard</h1>

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

            {/* Display restaurants in tabular form */}
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
                <p>No restaurants available.</p>
            )}
            </div>
    </div>
  )
}