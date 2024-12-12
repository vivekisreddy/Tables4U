'use client';
import React, { useEffect, useState } from 'react'; // Ensure React is imported
import axios from 'axios';

export default function ManagerViewDay() {
  const [restaurantID, setRestaurantID] = useState('');
  const [viewDate, setViewDate] = useState('');
  const [availabilityTable, setAvailabilityTable] = useState<any[][]>([]); // Store availability as a 2D array
  const [tableNames, setTableNames] = useState<string[]>([]); // Store table names like T1, T2, etc.
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');


  const instance = axios.create({
    baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
  });

  function closeDate() {
    if (viewDate && restaurantID) {
        instance.post('/managerCloseDate', {"resID":restaurantID, "dateToClose":viewDate})
        .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body

            console.log("response status:", status)

            if (status == 200) {
                console.log("response status:", status)
                console.log("Successfully closed Date")
                setMessage("Successfully closed Date")
            } else {
                setMessage("Invalid Information")
                console.log("Error closing date:", result)
            }
        }) .catch(function (error) {
            console.log(error)
        })
    } else {
        setMessage("Please verify input information")
    }
    }

    function openDate() {
        if (viewDate && restaurantID) {
        instance.post('/managerOpenDate', {"resID":restaurantID, "dateToClose":viewDate})
        .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body

            console.log("response status:", status)

            if (status == 200) {
            console.log("response status:", status)
            console.log("Successfully opened Date")
            setMessage("Successfully opened Date")
            } else {
            setMessage("Invalid Information")
            console.log("Error opening date:", result)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
        } else {
        setMessage("Please verify input information")
        }
    }

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
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/managerViewDayAvailability',
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

    const handleCloseDate = (and:any) => {
        and.preventDefault()
        closeDate()
    }

    const handleOpenDate = (and:any) => {
        and.preventDefault()
        openDate()
    }

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
      <div className="button-container">
          <button onClick={handleSubmit} className="button-info" disabled={!restaurantID || !viewDate}>
            Check Availability
            </button>
        </div>
        <div className="button-container">
          <button onClick={handleCloseDate} className="button-info">
              Close Date
          </button>
          <button onClick={handleOpenDate} className="button-info">
              Open Date
          </button>
        </div>
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
  ) }