'use client'; // Add this at the top of your component file

import React, { useState } from "react";
import axios from "axios";

export default function ActivateRestaurantPage() {
  const [redraw, forceRedraw] = React.useState(0)
    const [restaurantID, setRestaurantID] = useState<string>('');
    const [message, setMessage] = useState<string>('');

      // helper function that forces React app to redraw whenever this is called.
      function andRefreshDisplay() {
        forceRedraw(redraw + 1)
      }

    // Function to activate the restaurant
    const handleActivateRestaurant = async () => {
        // if (!restaurantID) {
        //     setMessage('Please provide a restaurant ID!');
        //     return;
        // }

        try {
            const activationData = { restaurantID };  
            const response = await axios.post(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/activateRes',  // Adjust the URL if needed
                activationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setMessage(`Restaurant activated successfully!`);
                console.log(response.data);
            } else {
                const errorMessage = response.data.error || 'Failed to activate restaurant';
                setMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error activating restaurant:', error);
            setMessage('Error activating restaurant');
        }
    };

    function managerAccount() {
      // displays account information
      // log out button
      andRefreshDisplay()
    }
  
  const editRestaurant = (and) => {
      and.preventDefault()
      window.location.replace('/editRes')
      andRefreshDisplay()
    }

    return (
        <div className="container">
            <h1 className="title">Activate Restaurant</h1>

            {/* Input for restaurantID */}
            <div className="input-container">
                <label htmlFor="restaurantID">Enter Restaurant ID:</label>
                <input
                    type="text"
                    id="restaurantID"
                    value={restaurantID}
                    onChange={(e) => setRestaurantID(e.target.value)}
                    placeholder="Enter Restaurant ID"
                />
            </div>

            <div className="button-container">
                <button onClick={handleActivateRestaurant} className="button-activateRes">
                    Activate Restaurant
                </button>
            </div>

            {message && <p className="message">{message}</p>} {/* Display the message */}

            <button className="editRestaurantButton" onClick={(e) => editRestaurant} >Edit Restaurant</button>
<button className="managerAccountButton" onClick={(e) => managerAccount()} >Account Information</button>
        </div>
    );
}