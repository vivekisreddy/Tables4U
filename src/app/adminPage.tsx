"use client";

import React, { useState } from "react";
import { AdminController } from "../aListRestaurants"
import { Restaurant } from "../restaurant";

export default function ListRestaurants() {
    // Mock data for restaurants
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    // Initialize AdminController with no restaurants for now
    const controller = new AdminController(restaurants);

    const handleListRestaurants = () => {
        const allRestaurants = controller.listRestaurants();
        setRestaurants(allRestaurants); // Update state to show restaurants
    };

    return (
        <div className="list-restaurants-container">
            <h1>Admin: List Restaurants</h1>
            <button onClick={handleListRestaurants}>Show Restaurants</button>
            <div className="restaurant-list">
                {restaurants.length > 0 ? (
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li key={restaurant.restaurantID}>
                                <strong>{restaurant.name}</strong>
                                <p>{restaurant.address}</p>
                                <p>Status: {restaurant.isActive ? "Active" : "Inactive"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No restaurants available.</p>
                )}
            </div>
        </div>
    );
}