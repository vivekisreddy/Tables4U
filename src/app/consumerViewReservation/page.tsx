'use client';
import React, { useState } from 'react';
import axios from 'axios';

// Define the type for reservation details
interface ReservationDetails {
  name: string;
  reservationDate: string;  // 'YYYY-MM-DD' format
  reservationTime: number;  // The hour of the reservation (2, 3, 4)
  partySize: number;
}

export default function GetReservationDetails() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!confirmationCode) {
      alert('Please enter a confirmation code');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerViewReservation',
        { confirmationCode },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 200) {
        // Parse the 'body' string into a JavaScript object
        const reservationData = JSON.parse(response.data.body);
        
        // Format the reservation date to 'YYYY-MM-DD'
        const formattedDate = new Date(reservationData.reservationDate).toLocaleDateString();
  
        // Update the reservation data with the formatted date
        reservationData.reservationDate = formattedDate;
  
        setReservationDetails(reservationData);  // Set the formatted reservation details
      } else {
        setError('No reservation found for this confirmation code.');
        setReservationDetails(null);
      }
    } catch (error) {
      console.error('Error fetching reservation:', error);
      setError('An error occurred while fetching the reservation.');
      setReservationDetails(null);
    }
  };
  
  return (
    <div className="reservation-container">
      <h1>Get Reservation Details</h1>

      <div className="reservation-form">
        <label>
          Confirmation Code:
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Enter your confirmation code"
            className="input-field"
          />
        </label>

        <button onClick={handleSubmit} className="submit-button">Get Reservation Details</button>

        {reservationDetails && (
          <div className="reservation-details">
            <h2>Reservation Details</h2>
            <p><strong>Restaurant:</strong> {reservationDetails.name}</p>
            <p><strong>Date:</strong> {reservationDetails.reservationDate}</p>
            <p><strong>Time:</strong> {reservationDetails.reservationTime}</p> 
            <p><strong>Party Size:</strong> {reservationDetails.partySize}</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
