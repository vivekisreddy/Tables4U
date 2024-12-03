'use client'; 
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

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
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]); 
    const [showActiveOnly, setShowActiveOnly] = useState(false); 
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

    return (
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
    );
}
