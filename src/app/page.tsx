"use client";

import React from "react";
import { useState } from "react";

interface Restaurant {
  name: string;
  address: string;
  restaurantID: string;
  tableCount: number;
  seats: number[];
  openTime: number;
  closeTime: number;
  closedDays: number[];
}

const ManagerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    tableCount: "",
    seats: "",
    openTime: "",
    closeTime: "",
    closedDays: "",
  });
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRestaurant = () => {
    // Validate inputs
    if (
      !formData.name ||
      !formData.address ||
      !formData.tableCount ||
      !formData.seats ||
      !formData.openTime ||
      !formData.closeTime ||
      !formData.closedDays
    ) {
      setMessage("Please fill out all fields.");
      return;
    }

    const tableCount = parseInt(formData.tableCount, 10);
    const seats = formData.seats.split(",").map(Number);

    if (seats.length !== tableCount) {
      setMessage("The number of seats must match the number of tables.");
      return;
    }

    // Generate credentials
    const username = `${formData.name.replace(/\s+/g, "").toLowerCase()}@manager`;
    const password = Math.random().toString(36).slice(-8); // Random 8-character password

    // Create restaurant object
    const restaurant: Restaurant = {
      name: formData.name,
      address: formData.address,
      restaurantID: `${Date.now()}`, // Unique ID based on timestamp
      tableCount,
      seats,
      openTime: parseInt(formData.openTime, 10),
      closeTime: parseInt(formData.closeTime, 10),
      closedDays: formData.closedDays.split(",").map(Number),
    };

    // Store in localStorage
    const storedRestaurants = JSON.parse(localStorage.getItem("restaurants") || "[]");
    localStorage.setItem("restaurants", JSON.stringify([...storedRestaurants, restaurant]));

    // Update state
    setCredentials({ username, password });
    setMessage(`Restaurant '${formData.name}' has been created successfully.`);
  };

  return (
    <div className="manager-page">
      <div className="form-container">
        <h2>Restaurant Management</h2>
        <div className="form-section">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Restaurant Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="tableCount"
            placeholder="Number of Tables"
            value={formData.tableCount}
            onChange={handleInputChange}
          />
          <textarea
            name="seats"
            placeholder="Seats per Table (comma-separated, e.g., 4,6,8)"
            value={formData.seats}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="openTime"
            placeholder="Opening Time (e.g., 9)"
            value={formData.openTime}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="closeTime"
            placeholder="Closing Time (e.g., 21)"
            value={formData.closeTime}
            onChange={handleInputChange}
          />
          <textarea
            name="closedDays"
            placeholder="Closed Days (comma-separated, e.g., 0,6 for Sunday and Saturday)"
            value={formData.closedDays}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleCreateRestaurant} className="create-button">
          Create Restaurant
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}

      {credentials && (
        <div className="credentials">
          <p>Credentials:</p>
          <p>Username: {credentials.username}</p>
          <p>Password: {credentials.password}</p>
        </div>
      )}
    </div>
  );
};

export default ManagerPage;
