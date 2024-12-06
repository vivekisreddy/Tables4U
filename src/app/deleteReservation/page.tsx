'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteReservation() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [message, setMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    if (!confirmationCode) {
      setMessage('Please enter a confirmation code.');
      return;
    }

    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/consumerDeleteReservation',
        { confirmationCode },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const result = JSON.parse(response.data.body);

      if (response.status === 200 && result.success) {
        setIsDeleted(true);
        setMessage('Reservation deleted successfully.');
      } else {
        setMessage(result.message || 'Failed to delete reservation.');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setMessage('Error deleting reservation.');
    }
  };

  return (
    <div className="delete-reservation-container">
      <h1>Delete Reservation</h1>

      <div className="delete-form">
        <label>
          Confirmation Code:
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="input-field"
          />
        </label>

        <button onClick={handleDelete} className="submit-button">
          Delete Reservation
        </button>

        {message && <p className="message">{message}</p>}

        
      </div>
    </div>
  );
}
