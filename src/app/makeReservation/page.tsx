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
      console.log(reservationData); // Debugging
  
      const response = await axios.post(
        'https://YOUR_API_GATEWAY_URL_HERE',
        reservationData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const result = response.data;
      if (response.status === 200) {
        alert('Reservation successful!');
      } else {
        alert(result.error || 'Something went wrong.');
      }
  
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Error submitting reservation.');
    }
  };
  


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
          />
        </label>

        <label>
          Date (YYYY-MM-DD):
          <input
            type="text"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            placeholder="Enter date as YYYY-MM-DD"
          />
        </label>

        <label>
          Time (Hour only, e.g., 3 for 3:00):
          <input
            type="text"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            placeholder="Enter hour only (e.g., 3)"
          />
        </label>

        <label>
          Party Size:
          <input
            type="number"
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
          />
        </label>

        <label>
          Your Email:
          <input
            type="email"
            value={consumerEmail}
            onChange={(e) => setConsumerEmail(e.target.value)}
          />
        </label>

        <button onClick={handleSubmit}>Submit Reservation</button>
      </div>
    </div>
  );
}
