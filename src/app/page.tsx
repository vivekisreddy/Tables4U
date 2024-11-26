'use client';

import React, { useState } from 'react';
import axios from 'axios';

// Define the type for Restaurant
interface Restaurant {
    name: string;
    address: string;
}

export default function Home() {
    // State variables
    const [activeRestaurants, setActiveRestaurants] = useState<Restaurant[]>([]); // Stores the list of active restaurants
    const [message, setMessage] = useState<string>(''); // For success or error messages

    // Function to fetch active restaurants from the API
    const listActiveRestaurants = async () => {
        try {
            const response = await axios.get(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerListRes',
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Raw Response:", response);

            if (response.status === 200) {
                const restaurantData = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;

                console.log("Parsed Active Restaurants:", restaurantData);

                // Update the state with the fetched restaurant list
                setActiveRestaurants(restaurantData);
                setMessage('Active restaurants loaded successfully!');
            } else {
                throw new Error('Failed to load active restaurants.');
            }
        } catch (error) {
            console.error('Error fetching active restaurants:', error);
            setMessage('Error loading active restaurants.');
            setActiveRestaurants([]); // Clear the list in case of error
        }
    };

    // Placeholder function to redirect to admin login
    const adminLogIn = () => {
        window.location.replace('/adminLogIn');
    };

    // Placeholder function to redirect to manager login
    const managerLogIn = () => {
        window.location.replace('/managerLogIn');
    };

    return (
        <div className="consumer-home-container">
            <h1 className="title">Welcome to Tables4U!</h1>

            {/* Admin and Manager Login */}
            <div className="login-container">
                <button className="adminLogInButton" onClick={adminLogIn}>
                    Admin Log In
                </button>
                <button className="managerLogInButton" onClick={managerLogIn}>
                    Manager Log In
                </button>
            </div>

            {/* Search and Confirm Reservations */}
            <div className="action-container">
                <button className="list-active-restaurants-button" onClick={listActiveRestaurants}>
                    List All Active Restaurants
                </button>
            </div>

            {/* Display success or error message */}
            {message && <p className="message">{message}</p>}

            {/* Display the list of active restaurants */}
            {activeRestaurants.length > 0 ? (
                <div className="restaurant-list">
                    {activeRestaurants.map((restaurant, index) => (
                        <div key={index} className="restaurant-item">
                            <p>
                                <strong>Name:</strong> {restaurant.name}
                            </p>
                            <p>
                                <strong>Address:</strong> {restaurant.address}
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                message === 'Active restaurants loaded successfully!' && (
                    <p>No active restaurants available.</p>
                )
            )}
        </div>
    );
}
