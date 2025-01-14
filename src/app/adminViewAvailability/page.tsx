'use client'; // Ensuring it's a client-side component
import React, { useEffect, useState } from 'react'; // Ensure React is imported
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Suspense } from 'react';

const AdminViewAvailability = () => {
  const [restaurantID, setRestaurantID] = useState('');
  const [viewDate, setViewDate] = useState('');
  const [availabilityTable, setAvailabilityTable] = useState<any[][]>([]); // Store availability as a 2D array
  const [tableNames, setTableNames] = useState<string[]>([]); // Store table names like T1, T2, etc.
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const nameFromQuery = searchParams.get('name');

  useEffect(() => {
    if (nameFromQuery) {
      setRestaurantID(nameFromQuery); // Use the restaurant name from query params
    }
  }, [nameFromQuery]);

  const handleSubmit = async () => {
    console.log('Button clicked'); // Debug log to ensure handleSubmit is called
  
    // Validate inputs
    if (!restaurantID || !viewDate) {
      setError('Please provide both restaurant ID and date.');
      return;
    }
  
    try {
      // Call the backend API to fetch availability
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/',
        { restaurantID, viewDate },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('API Response:', response.data); // Log response for debugging
  
      const result = response.data;
  
      // Parse the body since it is stringified JSON
      const parsedBody = JSON.parse(result.body); // Parse the stringified body
  
      if (result.statusCode === 200) {
        setAvailabilityTable(parsedBody.availabilityTable || []);
        setTableNames(parsedBody.availabilityTable[0]?.slice(1) || []); // Extract table names from the first row
        setError(null); // Clear any previous errors
      } else {
        setError(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setError('Error fetching availability.');
    }
  };  

  return (
    <div className="admin-view-day-container">
      <h1>Admin View for {restaurantID}</h1>

      <div className="form-container">
        <label>
          Restaurant ID:
          <input
            type="text"
            value={restaurantID}
            onChange={(e) => setRestaurantID(e.target.value)}
            placeholder="Enter Restaurant ID"
            className="input-field"
          />
        </label>

        <label>
          Date (YYYY-MM-DD):
          <input
            type="text"
            value={viewDate}
            onChange={(e) => setViewDate(e.target.value)}
            placeholder="Enter date as YYYY-MM-DD"
            className="input-field"
          />
        </label>

        <button onClick={handleSubmit} className="submit-button" disabled={!restaurantID || !viewDate}>
          View Availability
        </button>

        {error && <div className="error-message">{error}</div>}

        {/* Conditionally render the table if availability data is available */}
        {availabilityTable.length > 0 && tableNames.length > 0 && (
          <div className="availability-table">
            <h3>Availability for {viewDate}</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  {tableNames.map((table, index) => (
                    <th key={index}>{table}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {availabilityTable.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row[0]}</td> {/* Time column */}
                    {row.slice(1).map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td> // Availability for each table
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminViewAvailabilityWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminViewAvailability />
    </Suspense>
  );
}
