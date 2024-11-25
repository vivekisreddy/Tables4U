'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

import React from "react";
import axios from "axios";

export default function Home() {

    const[redraw, forceRedraw] = React.useState(0)
    const[resName, setResName] = React.useState('')
    const[resAddress, setResAddress] = React.useState('')
    const[resNumTables, setResNumTables] = React.useState(0)
    const[resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const[message, setMessage] = React.useState('');
    const[resOpenTime, setResOpenTime] = React.useState(0);
    const[resCloseTime, setResCloseTime] = React.useState(0);


    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
        forceRedraw(redraw + 1)
    }

  const handleAddSeats = (index: number, value: number) => {
    const updatedSeats = [...resSeatsPerTable];
    updatedSeats[index] = value;
    setResSeatsPerTable(updatedSeats);
};

  const handleCreateRestaurant = async () => {

    const restaurantData = {
        name: resName,
        address: resAddress,
        numTables: resNumTables,
        seatsPerTable: resSeatsPerTable,
        openTime: resOpenTime,
        closeTime: resCloseTime,
    }
    setResName('');
    setResAddress('');
    setResNumTables(0);
    setResOpenTime(0);
    setResOpenTime(0);
    setResSeatsPerTable([]);

    try {
        const response = await fetch('https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/createRestaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if needed, such as authentication tokens
            },
            body: JSON.stringify(restaurantData),
        });

        if (!response.ok) {
            throw new Error('Failed to create restaurant');
        }

        const result = await response.json();
        setMessage('Restaurant created successfully!');
        console.log(result);  // Log the response from the backend
    } catch (error) {
        console.error('Error:', error);
        setMessage('Error creating restaurant');
    }

    // display credentials then log in button to bring user back to manager log in page
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
                onChange={(e) => setResCloseTime(Number(e.target.value))}  // Ensure it's converted to a number
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
                            onChange={(e) => handleAddSeats(index, Number(e.target.value))}
                            className="input"
                        />
                    </label>
                </div>
            ))}

        <button onClick={handleCreateRestaurant} className="button-createRes">
            Create Restaurant
        </button>
        {message && <p className="message">{message}</p>}
    </div>
);
}
