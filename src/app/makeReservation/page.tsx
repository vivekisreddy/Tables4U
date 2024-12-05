'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

export default function MakeReservation() {
    const [restaurantID, setRestaurantID] = React.useState('');
    const [partySize, setPartySize] = React.useState(0);
    const [consumerEmail, setConsumerEmail] = React.useState('');
    const [reservationDate, setReservationDate] = React.useState('');
    const [reservationTime, setReservationTime] = React.useState('');
    const [confirmationCode, setConfirmationCode] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleMakeReservation = async () => {
        const reservationData = {
            restaurantID,
            partySize,
            consumerEmail,
            reservationDate,
            reservationTime,
        };
            
        try {
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerMakeReservation',
                reservationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000,
                }
            );

            if (response.status === 200) {
                const responseBody = JSON.parse(response.data.body);
                const { message, confirmationCode } = responseBody;

                if (message && confirmationCode) {
                    setMessage(`${message} (Confirmation Code: ${confirmationCode})`);
                    setConfirmationCode(confirmationCode); // Set the confirmation code for display
                } else {
                    setMessage('Unexpected response format.');
                }
            } else {
                throw new Error('Failed to make reservation.');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else if (error instanceof Error) {
                console.error('Error making reservation:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            setMessage('Error making reservation.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Make Reservation</h1>
            <div className="rectangle-box">
                <label className="label">
                    Restaurant ID:
                    <input
                        type="text"
                        value={restaurantID}
                        onChange={(e) => setRestaurantID(e.target.value)}
                        className="input"
                    />
                </label>
                <label className="label">
                    Party Size:
                    <input
                        type="number"
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="input"
                    />
                </label>
                <label className="label">
                    Consumer Email:
                    <input
                        type="email"
                        value={consumerEmail}
                        onChange={(e) => setConsumerEmail(e.target.value)}
                        className="input"
                    />
                </label>
                <label className="label">
                    Reservation Date (YYYY-MM-DD):
                    <input
                        type="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="input"
                    />
                </label>
                <label className="label">
                    Reservation Time (HH:MM):
                    <input
                        type="time"
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="input"
                    />
                </label>
            </div>
            <div className="button-container">
                <button onClick={handleMakeReservation} className="button-makeRes">
                    Make Reservation
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
