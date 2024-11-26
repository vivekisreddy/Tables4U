'use client'; // Add this at the top of your component file

import React, { useState } from "react";
import axios from "axios";

export default function ActivateRestaurantPage() {
  const [redraw, forceRedraw] = React.useState(0)
    const [restaurantID, setRestaurantID] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [resID, setResID] = useState(''); // For success or error messages

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

    const deleteRestaurant = async () => {
        try {
            const response = await axios.get(
                'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/managerDeleteRestaurant',
                { headers: { 'Content-Type': 'application/json' } }
            );
  
            console.log("Raw Response:", response);  // Check the whole response
  
            if (response.status === 200) {
              console.log("response status:", response.status)
              console.log("Restaurant successfully deleted")
              //andRefreshDisplay()
            } else {
              alert("Failed to delete restaurant")
            }
          } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
              console.log('Axios error:', error.message)
            } else if (error instanceof Error) {
              console.log('Error deleting restaurant:', error.message)
            } else {
              console.log('Unexpected error')
            }
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
        <div className="manager-activate">
            <h1 className="title">Ready to Activate Your Restaurant?</h1>

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

            <form className="handleDeleteRestaurant" onSubmit={deleteRestaurant}>
                <label className="label" htmlFor="resID">Restaurant ID:</label>
                <input type="text" style={{ color: 'black' }} id="resID" name="resID" value={resID} onChange={(and) => setResID(and.target.value)}/>
                <button type="submit" className="deleteRestaurantButton">Delete Restaurant</button>
            </form>
        </div>
    );
}