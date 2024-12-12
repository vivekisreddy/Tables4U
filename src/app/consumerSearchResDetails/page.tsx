'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ConsumerSearchResDetails = () => {
  const [restaurant, setRestaurant] = useState<any>(null);
  const searchParams = useSearchParams();  // Get the searchParams from the URL
  const router = useRouter();  // Correctly use the router

  useEffect(() => {
    // Retrieve the 'restaurantData' from the URL's query params
    const restaurantData = searchParams.get('restaurantData');
    if (restaurantData) {
      const parsedData = JSON.parse(restaurantData);  // Parse the JSON data
      setRestaurant(parsedData);  // Set the restaurant data to state
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

// Wrap your component in Suspense for async handling
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsumerSearchResDetails />
    </Suspense>
  );
}