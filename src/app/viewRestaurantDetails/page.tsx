'use client';
import React, { useState } from 'react';
import axios from 'axios';

// Define the type for restaurant details
interface RestaurantDetails {
  name: string;
  address: string;
  openTime: number;  // Hour (e.g., 7 for 7 AM)
  closeTime: number; // Hour (e.g., 24 for midnight)
  isActive: number;  // 1 for Active, 0 for Inactive
  restaurantID: string;
}

interface TableDetails {
  table: number;
  seats: number;
}

export default function GetRestaurantDetails() {
  const [restaurantID, setRestaurantID] = useState('');
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null);
  const [tables, setTables] = useState<TableDetails[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!restaurantID) {
      alert('Please enter a valid restaurant ID');
      return;
    }

    try {
      // Post request to Lambda function with restaurant ID
      const response = await axios.post(
        'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/viewRestaurantDetails',
        { resID: restaurantID },  // Change 'restaurantID' to 'resID'
        { headers: { 'Content-Type': 'application/json' } }
      );
      

      // Check for successful response
      if (response.status === 200) {
        // Parse the response body (which is a string) into a JavaScript object
        const data = JSON.parse(response.data.body);

        // Extract restaurant and table details from response
        const restaurantData: RestaurantDetails = {
          name: data.restaurant.name,
          address: data.restaurant.address,
          openTime: data.restaurant.openTime,
          closeTime: data.restaurant.closeTime,
          isActive: data.restaurant.isActive,
          restaurantID: data.restaurant.restaurantID,
        };

        const tableData: TableDetails[] = data.tables.map((table: any) => ({
          table: table.table,
          seats: table.seats,
        }));

        // Set the restaurant and table details
        setRestaurantDetails(restaurantData);
        setTables(tableData);
      } else {
        setError('Restaurant not found.');
        setRestaurantDetails(null);
        setTables([]);
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      setError('An error occurred while fetching restaurant details.');
      setRestaurantDetails(null);
      setTables([]);
    }
  };

  return (
    <div className="restaurant-container">
      <h1>Get Restaurant Details</h1>

      <div className="restaurant-form">
        <label>
          Restaurant ID:
          <input
            type="text"
            value={restaurantID}
            onChange={(e) => setRestaurantID(e.target.value)}
            placeholder="Enter restaurant ID"
            className="input-field"
          />
        </label>

        <button onClick={handleSubmit} className="submit-button">Get Restaurant Details</button>

        {/* Display Restaurant Details */}
        {restaurantDetails && (
          <div className="restaurant-details">
            <h2>Restaurant Details</h2>
            <p><strong>Name:</strong> {restaurantDetails.name}</p>
            <p><strong>Address:</strong> {restaurantDetails.address}</p>
            <p><strong>Open Time:</strong> {restaurantDetails.openTime} AM</p>
            <p><strong>Close Time:</strong> {restaurantDetails.closeTime} PM</p>
            <p><strong>Status:</strong> {restaurantDetails.isActive === 1 ? 'Active' : 'Inactive'}</p>
          </div>
        )}

        {/* Display Tables and Seats */}
        {tables.length > 0 && (
          <div className="tables-details">
            <h3>Tables</h3>
            <ul>
              {tables.map((table) => (
                <li key={table.table}>Table {table.table}: {table.seats} seats</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Error Message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}