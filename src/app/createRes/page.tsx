'use client'; // Add this at the top of your component file

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [resName, setResName] = useState('');
    const [resAddress, setResAddress] = useState('');
    const [resNumTables, setResNumTables] = useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = useState<number[]>([]);
    const [resOpenTime, setResOpenTime] = useState(0);
    const [resCloseTime, setResCloseTime] = useState(0);
    const [resClosedDays, setResClosedDays] = useState<string[]>([]);
    const [restaurantID, setRestaurantID] = useState<string | null>(null);  // Store the restaurantID
    const [message, setMessage] = useState('');

    // On component mount, check if restaurantID is in localStorage
    useEffect(() => {
        const storedRestaurantID = localStorage.getItem('restaurantID');
        if (storedRestaurantID) {
            setRestaurantID(storedRestaurantID);
        }
    }, []);

    // Function to create the restaurant
    const handleCreateRestaurant = async () => {
        const restaurantData = {
            name: resName,
            address: resAddress,
            openTime: resOpenTime,
            closeTime: resCloseTime,
            closedDays: resClosedDays,
            tables: resNumTables,
            seats: resSeatsPerTable,
        };

        try {
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/createRestaurant',
                restaurantData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000, // Timeout in milliseconds (5 seconds)
                }
            );

            console.log("Raw Response:", response);

            if (response.status === 200) {
                const responseBody = JSON.parse(response.data.body);
                const { message, restaurantID } = responseBody;
                // window.location.replace('/managerLogIn');

                if (message && restaurantID) {
                    setMessage(`${message} (Restaurant ID: ${restaurantID})`);
                    setRestaurantID(restaurantID);  // Set the restaurantID from response
                    localStorage.setItem('restaurantID', restaurantID);  // Store in localStorage
                    console.log(`Success: ${message}, Restaurant ID: ${restaurantID}`);
                    <div>
                    <label className="account">{"Log back in here:"}</label>
                    <button className="managerBackToLogIn" onClick={(e) => window.location.replace('/managerLogIn')}>Go To Log In</button>
                    </div>
                } else {
                    setMessage('Unexpected response format.');
                    //console.error('Unexpected Response Format:', responseBody);
                }
            } else {
                throw new Error('Failed to create restaurant.');
            }
        } catch (error) {
            console.error('Error creating restaurant:', error);
            setMessage('Error creating restaurant.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Create Restaurant</h1>
            <label className="label">
                Restaurant Name:
                <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="input"
                />
            </label>
            <label className="label">
                Restaurant Address:
                <input
                    type="text"
                    value={resAddress}
                    onChange={(e) => setResAddress(e.target.value)}
                    className="input"
                />
            </label>
            <label className="label">
                Open Time:
                <input
                    type="number"
                    value={resOpenTime}
                    onChange={(e) => setResOpenTime(Number(e.target.value))}
                    className="input"
                />
            </label>
            <label className="label">
                Close Time:
                <input
                    type="number"
                    value={resCloseTime}
                    onChange={(e) => setResCloseTime(Number(e.target.value))}
                    className="input"
                />
            </label>
            <label className="label">
                Number of Tables:
                <input
                    type="number"
                    value={resNumTables}
                    onChange={(e) => setResNumTables(Number(e.target.value))}
                    className="input"
                />
            </label>

            {[...Array(resNumTables)].map((_, index) => (
                <div key={index}>
                    <label className="label">
                        Seats at Table {index + 1}:
                        <input
                            type="number"
                            value={resSeatsPerTable[index] || 0}
                            onChange={(e) => {
                                const updatedSeats = [...resSeatsPerTable];
                                updatedSeats[index] = Number(e.target.value);
                                setResSeatsPerTable(updatedSeats);
                            }}
                            className="input"
                        />
                    </label>
                </div>
            ))}

            <label className="label">
                Closed Days (format: YYYY-MM-DD):
                <input
                    type="text"
                    value={resClosedDays.join(', ')} // Display closed days as comma-separated string
                    onChange={(e) => setResClosedDays(e.target.value.split(',').map(day => day.trim()))}
                    className="input"
                />
            </label>

            {/* Container for the buttons */}
            <div className="button-container">
                <button onClick={handleCreateRestaurant} className="button-createRes">
                    Create Restaurant
                </button>
            </div>

            {message && <p className="message">{message}</p>} {/* This will display the message including restaurant ID */}
        </div>
    );
}
