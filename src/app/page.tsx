"use client";

import React, { useState } from "react";
import { RestaurantController } from "../restaurantController";


export default function CreateRestaurant() {
    const controller = new RestaurantController();

    // State to hold form input values
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    // Handle form submission
    const handleCreateRestaurant = () => {
        const result = controller.createRestaurant(name, address);
        setMessage(result); // Display the result message
    };

    return (
        <div className="create-restaurant-container">
            <h1>Create Restaurant</h1>
            <div className="form-container">
                <label>
                    Restaurant Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter restaurant name"
                    />
                </label>
                <br />
                <label>
                    Restaurant Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter restaurant address"
                    />
                </label>
                <br />
                <button onClick={handleCreateRestaurant}>Create Restaurant</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
