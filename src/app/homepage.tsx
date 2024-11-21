"use client";

import React from "react";
import { useState } from "react";

export default function ActivateRestaurantForm() {
  const [restaurantID, setRestaurantID] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/activateRestaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantID }),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(result.success);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while activating the restaurant.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">Activate Restaurant</h2>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="restaurantID"
          placeholder="Enter Restaurant ID"
          value={restaurantID}
          onChange={(e) => setRestaurantID(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-foreground text-background px-4 py-2 hover:bg-gray-700 transition-colors"
        >
          Activate Restaurant
        </button>
      </form>
      {responseMessage && <p className="text-green-600">{responseMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}

