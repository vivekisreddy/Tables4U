'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files

import axios from "axios";
import React from "react";


export default function Home() {

    const [redraw, forceRedraw] = React.useState(0);
    const [resName, setResName] = React.useState('');
    const [resAddress, setResAddress] = React.useState('');
    const [resNumTables, setResNumTables] = React.useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const [message, setMessage] = React.useState('');
    const [resOpenTime, setResOpenTime] = React.useState(0);
    const [resCloseTime, setResCloseTime] = React.useState(0);
    const [resClosedDays, setResClosedDays] = React.useState<string[]>([]);




    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
        forceRedraw(redraw + 1)
    }

    const handleAddSeats = (index: number, value: number) => {
        const updatedSeats = [...resSeatsPerTable];
        updatedSeats[index] = value;
        setResSeatsPerTable(updatedSeats);
    };


    const editRes = async () => {
        let payload = {
            "name": resName, "address": resAddress, "openTime":resOpenTime, "closeTime":resCloseTime, "tables":resNumTables, "seats":resSeatsPerTable
        }
        try {
            const response = await axios.post(
            'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial',
            payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000,  // Timeout in milliseconds (5 seconds)
                }
            );
    
            if (response.status === 200) {
                setMessage('Restaurant created successfully!');
                console.log(response.data);  
            } else {
                throw new Error('Failed to create restaurant');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else if (error instanceof Error) {
                console.error('Error creating restaurant:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            setMessage('Error creating restaurant');
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
                            onChange={(e) => handleAddSeats(index, Number(e.target.value))}
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
                <button onClick={editRes} className="button-editRes">
                    Edit Restaurant
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}