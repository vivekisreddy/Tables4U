'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // To get query parameters
import axios from 'axios';

export default function MakeReservation() {
  const [restaurantName, setRestaurantName] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [consumerEmail, setConsumerEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');  // State for confirmation code
  const searchParams = useSearchParams();
  const nameFromQuery = searchParams.get('name'); // Extract restaurant name from query params

  useEffect(() => {
    if (nameFromQuery) {
      setRestaurantName(nameFromQuery); // Pre-fill the restaurant name field
    }
  }, [nameFromQuery]);

  const handleSubmit = async () => {
    // Ensure date is in YYYY-MM-DD format manually entered by the user
    const formattedDate = new Date(reservationDate);
    const formattedDateString = formattedDate.toISOString().split('T')[0]; // Get YYYY-MM-DD

    // Ensure time is in the format of a singular number (e.g., '3', '4', '5')
    const formattedTime = reservationTime.split(':')[0]; // Extract just the hour, e.g., '3', '4', '5'

    if (partySize < 1 || partySize > 8) {
      alert('Party size must be between 1 and 8.');
      return; // Prevent submission if invalid party size
    }

    const reservationData = {
      restaurantName,
      reservationDate: formattedDateString,  // Pass formatted date
      reservationTime: formattedTime,        // Pass time as singular hour
      partySize,
      consumerEmail,
    };

    try {
      // Send the reservation data to the backend
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerMakeReservation',
        reservationData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(response.data);  // Log the backend response for debugging

      // Extracting the confirmation code
      const result = JSON.parse(response.data.body);
      const confirmationCodeFromResponse = result.confirmationCode;

      if (response.status === 200 && confirmationCodeFromResponse) {
        // Set confirmation code after successful reservation
        setConfirmationCode(confirmationCodeFromResponse);
        alert('Reservation successful!');
      } else {
        alert(result.error || 'Something went wrong.');
      }

    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Error submitting reservation.');
    }
  };

  // Display Confirmation Code if available
  return (
    <div className="reservation-container">
      <h1>Make Reservation for {restaurantName}</h1>

      <div className="reservation-form">
        <label>
          Restaurant Name:
          <input
            type="text"
            value={restaurantName}
            readOnly
            className="input-field"
          />
        </label>

        <label>
          Date (YYYY-MM-DD):
          <input
            type="text"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            placeholder="Enter date as YYYY-MM-DD"
            className="input-field"
          />
        </label>

        <label>
          Time (Hour only, e.g., 3 for 3:00):
          <input
            type="text"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            placeholder="Enter hour only (e.g., 3)"
            className="input-field"
          />
        </label>

        <label>
          Party Size:
          <input
            type="number"
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="input-field"
          />
        </label>

        <label>
          Your Email:
          <input
            type="email"
            value={consumerEmail}
            onChange={(e) => setConsumerEmail(e.target.value)}
            className="input-field"
          />
        </label>

        <button onClick={handleSubmit} className="submit-button">Submit Reservation</button>

        {/* Display Confirmation Code if available */}
        {confirmationCode && (
          <div className="confirmation-code">
            <h3>Confirmation Code: {confirmationCode}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
