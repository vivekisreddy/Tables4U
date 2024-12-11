'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ConsumerSearchResDetails = () => {
  const [restaurant, setRestaurant] = useState<any>(null);
  const params = useParams(); // Use useParams to access dynamic route parameters

  const router = useRouter();  // Correcting the typo here
  
  useEffect(() => {
    // Access the restaurant data passed in the dynamic route params
    const restaurantData = params.restaurantData;
    
    if (restaurantData) {
      // Ensure that restaurantData is a string, and pick the first element if it's an array
      const dataToParse = Array.isArray(restaurantData) ? restaurantData[0] : restaurantData;
      
      try {
        const parsedData = JSON.parse(dataToParse);
        setRestaurant(parsedData); // Set the restaurant data to state
      } catch (error) {
        console.error("Error parsing restaurant data:", error);
      }
    }
  }, [params]);

  return (
    <div className="restaurant-details-container">
      {restaurant ? (
        <div className="restaurant-details">
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Open Time: {restaurant.openTime}</p>
          <p>Close Time: {restaurant.closeTime}</p>

          <button className="make-reservation-button">Make Reservation</button>

          <button 
            className="make-reservation-button"
            onClick={() => 
              router.push(`/makeReservation?name=${encodeURIComponent(restaurant.name)}`)
            }
          >
            Make Reservation
          </button>
        </div>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
};

export default ConsumerSearchResDetails;
