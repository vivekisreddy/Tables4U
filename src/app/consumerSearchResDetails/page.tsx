'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ConsumerSearchResDetails = () => {
  const [restaurant, setRestaurant] = useState<any>(null);
  const searchParams = useSearchParams(); // Get the searchParams

  const router = useRouter();  // Correcting the typo here
  
  useEffect(() => {
    // Access the restaurant data passed in the query
    const restaurantData = searchParams.get('restaurantData');
    if (restaurantData) {
      const parsedData = JSON.parse(restaurantData);
      setRestaurant(parsedData); // Set the restaurant data to state
    }
  }, [searchParams]);

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
