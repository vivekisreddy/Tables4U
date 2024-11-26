'use client';

import React, { useState } from "react";
import axios from "axios";

const EditRestaurant = () => {
    const [restaurantID, setRestaurantID] = useState('');
    const [resName, setResName] = useState('');
    const [resAddress, setResAddress] = useState('');
    const [resOpenTime, setResOpenTime] = useState(0);
    const [resCloseTime, setResCloseTime] = useState(0);
    const [resClosedDays, setResClosedDays] = useState<string[]>([]);  // For closed days
    const [resNumTables, setResNumTables] = useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = useState<number[]>([]);
    const [message, setMessage] = useState('');

    // Handle seat input for each table
    const handleAddSeats = (index: number, value: number) => {
        const updatedSeats = [...resSeatsPerTable];
        updatedSeats[index] = value;
        setResSeatsPerTable(updatedSeats);
    };
    const handleEditRestaurant = async () => {
        // Ensure required fields are filled
        if (!restaurantID || !resName || !resAddress || resOpenTime === 0 || resCloseTime === 0 || !resClosedDays.length || resSeatsPerTable.length !== resNumTables) {
            setMessage('Please fill in all fields properly.');
            return;
        }
    
        // Prepare data to send to backend
        const updatedData = {
            restaurantID,
            name: resName,
            address: resAddress,
            openTime: resOpenTime,
            closeTime: resCloseTime,
            closedDays: resClosedDays,
            tables: Array.from({ length: resNumTables }, (_, index) => ({
                seats: resSeatsPerTable[index],
            })),
        };
    
        try {
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/InitialeditRes', 
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000, // Timeout in milliseconds (5 seconds)
                }
            );
    
            console.log("Raw Response:", response);  // Log the entire response to inspect it
    
            // Ensure response has a valid 'data' field
            if (!response || !response.data || Object.keys(response.data).length === 0) {
                setMessage('Invalid or empty response received from server.');
                console.error('Empty or invalid response:', response);
                return;
            }
    
            // Parse the response properly
            let responseBody;
            try {
                responseBody = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log("Parsed Response:", responseBody);
            } catch (e) {
                console.error('Error parsing response:', e);
                setMessage('Error parsing response from server.');
                return;
            }
    
            // Handle success response
            if (responseBody && responseBody.message) {
                setMessage(`Restaurant updated successfully: ${responseBody.message}`);
                console.log(`Success: ${responseBody.message}`);
            } else {
                setMessage('Unexpected response format.');
                console.error('Unexpected Response Format:', responseBody);
            }
        } catch (error: unknown) {
            // Enhanced error handling with Axios-specific and general error types
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                setMessage(`Axios error: ${error.message}`);
            } else if (error instanceof Error) {
                console.error('Error editing restaurant:', error.message);
                setMessage(`Error editing restaurant: ${error.message}`);
            } else {
                console.error('Unexpected error:', error);
                setMessage('Unexpected error occurred.');
            }
        }
    };
    

    return (
        <div className="container">
            <h1 className="title">Edit Restaurant</h1>

            {/* Restaurant ID */}
            <label className="label">
                Restaurant ID:
                <input
                    type="text"
                    value={restaurantID}
                    onChange={(e) => setRestaurantID(e.target.value)}
                    className="input"
                />
            </label>

            {/* Restaurant Name */}
            <label className="label">
                Restaurant Name:
                <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="input"
                />
            </label>

            {/* Restaurant Address */}
            <label className="label">
                Restaurant Address:
                <input
                    type="text"
                    value={resAddress}
                    onChange={(e) => setResAddress(e.target.value)}
                    className="input"
                />
            </label>

            {/* Open Time */}
            <label className="label">
                Open Time:
                <input
                    type="number"
                    value={resOpenTime}
                    onChange={(e) => setResOpenTime(Number(e.target.value))}
                    className="input"
                />
            </label>

            {/* Close Time */}
            <label className="label">
                Close Time:
                <input
                    type="number"
                    value={resCloseTime}
                    onChange={(e) => setResCloseTime(Number(e.target.value))}
                    className="input"
                />
            </label>

            {/* Number of Tables */}
            <label className="label">
                Number of Tables:
                <input
                    type="number"
                    value={resNumTables}
                    onChange={(e) => setResNumTables(Number(e.target.value))}
                    className="input"
                />
            </label>

            {/* Seats for Each Table */}
            {[...Array(resNumTables)].map((_, index) => (
                <div key={index}>
                    <label className="label">
                        Seats at Table {index + 1}:
                        <input
                            type="number"
                            value={resSeatsPerTable[index] || 0}
                            onChange={(e) => handleAddSeats(index, Number(e.target.value))}
                            className="input"
                        />
                    </label>
                </div>
            ))}

            {/* Closed Days */}
            <label className="label">
                Closed Days (format: YYYY-MM-DD):
                <input
                    type="text"
                    value={resClosedDays.join(', ')} // Display closed days as comma-separated string
                    onChange={(e) => setResClosedDays(e.target.value.split(',').map(day => day.trim()))}
                    className="input"
                />
            </label>

            <div className="button-container">
                <button onClick={handleEditRestaurant} className="button-editRes">
                    Edit Restaurant
                </button>
            </div>

            {message && <p className="message">{message}</p>} {/* This will display the message */}
        </div>
    );
};

export default EditRestaurant;
