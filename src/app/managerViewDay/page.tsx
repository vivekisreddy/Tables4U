"use client"; // Add this line to mark this file as a client component

import React, { useEffect, useState } from 'react'; // Ensure React is imported
import { useParams } from 'next/navigation'; // Import useParams instead of useSearchParams
import axios from 'axios';

export default function ManagerViewDay() {
  const [restaurantID, setRestaurantID] = useState('');
  const [viewDate, setViewDate] = useState('');
  const [availabilityTable, setAvailabilityTable] = useState<any[][]>([]); // Store availability as a 2D array
  const [tableNames, setTableNames] = useState<string[]>([]); // Store table names like T1, T2, etc.
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const { name } = useParams(); // Get restaurant name from route params

  const instance = axios.create({
    baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
  });

  function closeDate() {
    if (viewDate && restaurantID) {
      instance.post('/managerCloseDate', { resID: restaurantID, dateToClose: viewDate })
        .then(function (response) {
          let status = response.data.statusCode;
          let result = response.data.body;
          if (status === 200) {
            setMessage("Successfully closed Date");
          } else {
            setMessage("Invalid Information");
            console.log("Error closing date:", result);
          }
        }).catch(function (error) {
          console.log(error);
        })
    } else {
      setMessage("Please verify input information");
    }
  }

  function openDate() {
    if (viewDate && restaurantID) {
      instance.post('/managerOpenDate', { resID: restaurantID, dateToClose: viewDate })
        .then(function (response) {
          let status = response.data.statusCode;
          let result = response.data.body;
          if (status === 200) {
            setMessage("Successfully opened Date");
          } else {
            setMessage("Invalid Information");
            console.log("Error opening date:", result);
          }
        }).catch(function (error) {
          console.log(error);
        })
    } else {
      setMessage("Please verify input information");
    }
  }

  useEffect(() => {
    if (Array.isArray(name)) {
      setRestaurantID(name[0]); // Use the first value if it's an array
    } else {
      setRestaurantID(name || ''); // If name is a string or undefined, set it directly
    }
  }, [name]);

  const handleSubmit = async () => {
    // Validate inputs
    if (!restaurantID || !viewDate) {
      setError('Please provide both restaurant ID and date.');
      return;
    }

    try {
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/managerViewDayAvailability',
        { restaurantID, viewDate },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const result = response.data;

      const parsedBody = JSON.parse(result.body); // Parse the stringified body

      if (result.statusCode === 200) {
        setAvailabilityTable(parsedBody.availabilityTable || []);
        setTableNames(parsedBody.availabilityTable[0]?.slice(1) || []);
        setError(null); // Clear any previous errors
      } else {
        setError(result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setError('Error fetching availability.');
    }
  };

  const handleCloseDate = (and: any) => {
    and.preventDefault();
    closeDate();
  };

  const handleOpenDate = (and: any) => {
    and.preventDefault();
    openDate();
  };

  return (
    <div className="container">
      <h1 className="admin-title">View Day Availability</h1>
      <div className="button-container">
        <div className="input-container">
          <label className="label">
            Restaurant ID:
            <input
              type="text"
              value={restaurantID}
              onChange={(e) => setRestaurantID(e.target.value)}
              className="input-field"
            />
          </label>
        </div>
      </div>
      <div className="button-container">
        <div className="input-container">
          <label className="label">
            Date (YYYY-MM-DD):
            <input
              type="text"
              value={viewDate}
              onChange={(e) => setViewDate(e.target.value)}
              className="input-field"
            />
          </label>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} className="button-info" disabled={!restaurantID || !viewDate}>
          Check Availability
        </button>
        <button onClick={handleCloseDate} className="button-info">
          Close Date
        </button>
        <button onClick={handleOpenDate} className="button-info">
          Open Date
        </button>
      </div>
      {message && <p className="message">{message}</p>}
      {error && <div className="error-message">{error}</div>}

      {/* Conditionally render the table if availability data is available */}
      {availabilityTable.length > 0 && tableNames.length > 0 && (
        <div className="availability-table">
          <table className="report-table">
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
  );
}
