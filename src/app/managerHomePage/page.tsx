'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; 
import axios from "axios";

export default function ActivateRestaurantPage() {
    const [restaurantID, setRestaurantID] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [resID, setResID] = useState(''); 
    const [resName, setResName] = useState(''); 

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    const router = useRouter(); 

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

    function deleteRestaurant() {
      if (resID && resName) {
        
        instance.post('/managerDeleteRes', {"restaurantID":resID, "name":resName})
        .then(function (response) {
          console.log("raw response:", response)
          let status = response.data.statusCode
          let result = response.data.body
  
          console.log("response status:", status)
  
          if (status == 200) {
            console.log("response status:", status)
            console.log("Restaurant successfully deleted")
            router.push('/managerLogIn')
          } else {
            console.log("Error deleting restaurant:", result)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }

    function managerAccount() {
      // displays account information
      // log out button
    }
  
  function editRestaurant() {
      router.push('/editRes')
    }

  function viewAvailability() {
    router.push('/managerViewDay')
  }

    const handleDeleteRestaurant = (and:any) => {
      and.preventDefault()
      if (resID == '') {
        alert("Please input the restaurant ID")
      }
      if (resName == '') {
        alert("Please input the restaurant name")
      }
      deleteRestaurant()
    }

    return (
      <div className="manager-home-container">
        <h1 className="page-title">Manager Home Page</h1>
    
        {/* Account Information Section */}
        <div className="account-info-section">
          <h2>Account Information</h2>
          <button className="managerAccountButton" onClick={() => managerAccount()}>
            View Account Information
          </button>
        </div>
    
        {/* Activate Restaurant Section */}
        <div className="activate-restaurant-section">
          <h2>Activate Your Restaurant</h2>
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
          <button onClick={handleActivateRestaurant} className="button-activateRes">
            Activate Restaurant
          </button>
          {message && <p className="message">{message}</p>}
        </div>

        <div className="account-info-section">
          <h2>View Day Availability</h2>
          <button className="managerAccountButton" onClick={() => viewAvailability()}>
            View Day Availability
          </button>
        </div>
    
        {/* Delete Restaurant Section */}
        <div className="delete-restaurant-section">
          <h2>Delete Restaurant</h2>
          <form className="delete-form" onSubmit={handleDeleteRestaurant}>
            <label htmlFor="resName">Restaurant Name:</label>
            <input
              type="text"
              id="resName"
              name="resName"
              value={resName}
              onChange={(e) => setResName(e.target.value)}
            />
            <label htmlFor="resID">Restaurant ID:</label>
            <input
              type="text"
              id="resID"
              name="resID"
              value={resID}
              onChange={(e) => setResID(e.target.value)}
            />
            <button type="submit" className="deleteRestaurantButton">
              Delete Restaurant
            </button>
          </form>
        </div>
      </div>
    );    
}