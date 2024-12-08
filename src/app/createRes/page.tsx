'use client';

import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'; 

export default function Home() {
    const [resName, setResName] = React.useState('');
    const [resAddress, setResAddress] = React.useState('');
    const [resNumTables, setResNumTables] = React.useState(0);
    const [resSeatsPerTable, setResSeatsPerTable] = React.useState<number[]>([]);
    const [message, setMessage] = React.useState('');
    const [resOpenTime, setResOpenTime] = React.useState(0);
    const [resCloseTime, setResCloseTime] = React.useState(0);
    const [resClosedDays, setResClosedDays] = React.useState<string[]>([]);
    const [isRestaurantActive, setIsRestaurantActive] = React.useState(false);

    const handleAddSeats = (index: number, value: number) => {
        const updatedSeats = [...resSeatsPerTable];
        updatedSeats[index] = value;
        setResSeatsPerTable(updatedSeats);
    };

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
                    timeout: 5000,
                }
            );

            if (response.status === 200) {
                const responseBody = JSON.parse(response.data.body);
                const { message, restaurantID } = responseBody;

                if (message && restaurantID) {
                    setMessage(`${message} (ID: ${restaurantID})`);
                } else {
                    setMessage('Unexpected response format.');
                }
            } else {
                throw new Error('Failed to create restaurant.');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else if (error instanceof Error) {
                console.error('Error creating restaurant:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            setMessage('Error creating restaurant.');
        }

        setResName('');
        setResAddress('');
        setResNumTables(0);
        setResOpenTime(0);
        setResCloseTime(0);
        setResSeatsPerTable([]);
        setResClosedDays([]);
    };

    const handleActivateRestaurant = async () => {
        const restaurantID = "some-id";

        try {
            const activationData = { restaurantID };
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/activateRes',
                activationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Restaurant activated successfully!');
                setIsRestaurantActive(true);
            } else {
                throw new Error('Failed to activate restaurant');
            }
        } catch (error) {
            console.error('Error activating restaurant:', error);
            setMessage('Error activating restaurant');
        }
    };

    return (
        <div className="container-create-res">
            <h1 className="-create-res-title">Create Restaurant</h1>
            <div className="rectangle-box">
                <label className="label">
                    Restaurant Name:
                    <input
                        type="text"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        className="input"
                        disabled={isRestaurantActive}
                    />
                </label>
                <label className="label">
                    Restaurant Address:
                    <input
                        type="text"
                        value={resAddress}
                        onChange={(e) => setResAddress(e.target.value)}
                        className="input"
                        disabled={isRestaurantActive}
                    />
                </label>
                <label className="label">
                    Open Time:
                    <input
                        type="number"
                        value={resOpenTime}
                        onChange={(e) => setResOpenTime(Number(e.target.value))}
                        className="input"
                        disabled={isRestaurantActive}
                    />
                </label>
                <label className="label">
                    Close Time:
                    <input
                        type="number"
                        value={resCloseTime}
                        onChange={(e) => setResCloseTime(Number(e.target.value))}
                        className="input"
                        disabled={isRestaurantActive}
                    />
                </label>
                <label className="label">
                    Number of Tables:
                    <input
                        type="number"
                        value={resNumTables}
                        onChange={(e) => setResNumTables(Number(e.target.value))}
                        className="input"
                        disabled={isRestaurantActive}
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
                                disabled={isRestaurantActive}
                            />
                        </label>
                    </div>
                ))}
                <label className="label">
                    Closed Days (format: YYYY-MM-DD):
                    <input
                        type="text"
                        value={resClosedDays.join(', ')}
                        onChange={(e) => setResClosedDays(e.target.value.split(',').map(day => day.trim()))}
                        className="input"
                        disabled={isRestaurantActive}
                    />
                </label>
            </div>
            <div className="button-container">
                <button onClick={handleCreateRestaurant} className="button-createRes" disabled={isRestaurantActive}>
                    Create Restaurant
                </button>
                <button onClick={handleActivateRestaurant} className="button-activateRes" disabled={isRestaurantActive}>
                    Activate Restaurant
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}