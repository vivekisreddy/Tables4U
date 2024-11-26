'use client'; 
import React, { useState } from 'react';
import axios from 'axios';

// Define the type for Restaurant
interface Restaurant {
    restaurantID: string;
    name: string;
    address: string;
    openTime: number;
    closeTime: number;
    isActive: number;
}

export default function Home() {
    // State variables
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
    const [activeRestaurantList, setActiveRestaurantList] = useState<Restaurant[]>([]); // Store active restaurant list
    const [message, setMessage] = useState(''); 

    // Function to list all restaurants from the API
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

    const listActiveRestaurants = () => {
        const activeRestaurants = restaurantList.filter(restaurant => restaurant.isActive === 0);
        setActiveRestaurantList(activeRestaurants);
        setMessage('Active restaurants loaded successfully!');
    };

    return (
        <div className="admin-container">
            <h1 className="title">Admin Dashboard</h1>

            <div className="button-container">
                <button className="listRestaurantsButton" onClick={listRestaurants}>
                    List All Restaurants
                </button>
                <button className="listActiveRestaurantsButton" onClick={listActiveRestaurants}>
                    List Active Restaurants
                </button>
            </div>

            {/* Display message */}
            {message && <p className="message">{message}</p>}

            {/* Display all restaurants */}
            {restaurantList.length > 0 && activeRestaurantList.length === 0 ? (
                <div className="restaurant-list">
                    {restaurantList.map((restaurant) => (
                        <div key={restaurant.restaurantID} className="restaurant-item">
                            <p><strong>ID:</strong> {restaurant.restaurantID}</p>
                            <p><strong>Name:</strong> {restaurant.name}</p>
                            <p><strong>Address:</strong> {restaurant.address}</p>
                            <p><strong>Open Time:</strong> {restaurant.openTime}</p>
                            <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
                            <p><strong>Status:</strong> {restaurant.isActive === 1 ? 'Inactive' : 'active'}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Display active restaurants */}
            {activeRestaurantList.length > 0 ? (
                <div className="restaurant-list">
                    {activeRestaurantList.map((restaurant) => (
                        <div key={restaurant.restaurantID} className="restaurant-item">
                            <p><strong>ID:</strong> {restaurant.restaurantID}</p>
                            <p><strong>Name:</strong> {restaurant.name}</p>
                            <p><strong>Address:</strong> {restaurant.address}</p>
                            <p><strong>Open Time:</strong> {restaurant.openTime}</p>
                            <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
                            <p><strong>Status:</strong> Active</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No more active restaurants available.</p>
            )}
        </div>
    );
}